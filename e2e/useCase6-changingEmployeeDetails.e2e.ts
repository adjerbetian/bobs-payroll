import {
    Employee,
    EmployeeType,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoUnionMemberRepository,
    NotFoundError,
    PaymentMethodType
} from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import {
    seedDirectPaymentMethod,
    seedHoldPaymentMethod,
    seedHourlyEmployee,
    seedSalariedEmployee,
    seedUnionMember
} from "../test/seeders";
import { generateIndex } from "../test/utils";

describe("Use Case 6: Changing Employee Details", () => {
    let employee: Employee;

    beforeEach(async () => {
        employee = await seedHourlyEmployee();
    });

    describe("basic infos", () => {
        it("should change the employee's name", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Name "James Bond"`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.name).to.equal("James Bond");
        });
        it("should change the employee's address", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Address "my new address"`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.address).to.equal("my new address");
        });
        it("should do nothing when the employee does not exist", async () => {
            const nonExistingId = generateIndex();

            await executePayrollCommand(`ChgEmp ${nonExistingId} Address "my new address"`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
    });
    describe("type", () => {
        it("should change the employee to hourly", async () => {
            employee = await seedSalariedEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Hourly 10`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.work).to.deep.equal({
                type: EmployeeType.HOURLY,
                hourlyRate: 10
            });
        });
        it("should change the employee to monthly salary", async () => {
            employee = await seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Salaried 10`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.work).to.deep.equal({
                type: EmployeeType.SALARIED,
                monthlySalary: 10
            });
        });
        it("should change the employee to commissioned", async () => {
            employee = await seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Commissioned 10 30`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.work).to.deep.equal({
                type: EmployeeType.COMMISSIONED,
                monthlySalary: 10,
                commissionRate: 30
            });
        });
    });
    describe("payment method", () => {
        describe("Hold", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

                const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
            });
            it("should change the employee's payment method if one existed", async () => {
                await seedDirectPaymentMethod({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

                const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
                expect(dbPaymentMethod).not.to.have.property("bank");
            });
        });
        describe("Direct", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id" "account-id"`);

                const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.DIRECT);
                expect(dbPaymentMethod).to.have.property("bank", "bank-id");
                expect(dbPaymentMethod).to.have.property("account", "account-id");
            });
            it("should change the employee's payment method if one existed", async () => {
                await seedHoldPaymentMethod({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id" "account-id"`);

                const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.DIRECT);
            });
            it("should do nothing when the account is missing", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id"`);

                const promise = mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
        describe("Mail", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Mail "my address"`);

                const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.MAIL);
                expect(dbPaymentMethod).to.have.property("address", "my address");
            });
            it("should change the employee's payment method if one existed", async () => {
                await seedHoldPaymentMethod({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} Mail "my address"`);

                const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.MAIL);
            });
            it("should do nothing when the address is missing", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Mail `);

                const promise = mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
    });
    describe.only("Union", () => {
        describe("Member", () => {
            it("should put the employee in Union", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Member member-123 Dues 10.5`);

                const dbUnionMember = await mongoUnionMemberRepository.fetchByEmployeeId(employee.id);
                expect(dbUnionMember).to.have.property("memberId", "member-123");
                expect(dbUnionMember).to.have.property("rate", 10.5);
            });
            it("should do nothing if the employee does not exist", async () => {
                const nonExistingId = generateIndex();
                await executePayrollCommand(`ChgEmp ${nonExistingId} Member member-123 Dues 10.5`);

                const promise = mongoUnionMemberRepository.fetchByEmployeeId(nonExistingId);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
            it("should update the due rate if the employee is already in union", async () => {
                const unionMember = await seedUnionMember({ employeeId: employee.id, rate: 10 });

                await executePayrollCommand(`ChgEmp ${employee.id} Member ${unionMember.memberId} Dues 20`);

                const dbUnionMember = await mongoUnionMemberRepository.fetchByEmployeeId(employee.id);
                expect(dbUnionMember).to.have.property("rate", 20);
            });
            it("should do nothing if the dues rate is not defined", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Member member-123 Dues`);

                const promise = mongoUnionMemberRepository.fetchByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
            it.skip("should do nothing when the member id is already used", async () => {});
        });
        describe("NoMember", () => {
            it.skip("should remove the employee from Union", async () => {});
        });
    });
});
