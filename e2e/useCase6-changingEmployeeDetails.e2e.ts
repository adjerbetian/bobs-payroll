import { dbModelSeeders, executePayrollCommand, expect, generateIndex } from "@test/e2e";
import {
    dbEmployees,
    dbPaymentMethods,
    dbUnionMembers,
    EmployeeDBModel,
    EmployeeType,
    NotFoundError,
    PaymentMethodDBModel,
    PaymentMethodType,
    UnionMemberDBModel
} from "../src";

describe("Use Case 6: Changing Employee Details", () => {
    let employee: EmployeeDBModel;

    beforeEach(async () => {
        employee = await dbModelSeeders.seedHourlyEmployee();
    });

    describe("basic infos", () => {
        it("should change the employee's name", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Name "James Bond"`);

            const dbEmployee = await fetchEmployeeById(employee.id);
            expect(dbEmployee.name).to.equal("James Bond");
        });
        it("should change the employee's address", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Address "my new address"`);

            const dbEmployee = await fetchEmployeeById(employee.id);
            expect(dbEmployee.address).to.equal("my new address");
        });
        it("should do nothing when the employee does not exist", async () => {
            const nonExistingId = generateIndex();

            await executePayrollCommand(`ChgEmp ${nonExistingId} Address "my new address"`);

            const dbEmployee = await fetchEmployeeById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
    });
    describe("type", () => {
        it("should change the employee to hourly", async () => {
            employee = await dbModelSeeders.seedSalariedEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Hourly 10`);

            const dbEmployee = await fetchEmployeeById(employee.id);
            expect(dbEmployee.type).to.equal(EmployeeType.HOURLY);
            expect(dbEmployee).to.have.property("hourlyRate", 10);
        });
        it("should change the employee to monthly salary", async () => {
            employee = await dbModelSeeders.seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Salaried 10`);

            const dbEmployee = await fetchEmployeeById(employee.id);
            expect(dbEmployee.type).to.equal(EmployeeType.SALARIED);
            expect(dbEmployee).to.have.property("salary", 10);
        });
        it("should change the employee to commissioned", async () => {
            employee = await dbModelSeeders.seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Commissioned 10 30`);

            const dbEmployee = await fetchEmployeeById(employee.id);
            expect(dbEmployee.type).to.equal(EmployeeType.COMMISSIONED);
            expect(dbEmployee).to.have.property("salary", 10);
            expect(dbEmployee).to.have.property("commissionRate", 30);
        });
    });
    describe("payment method", () => {
        describe("Hold", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
            });
            it("should change the employee's payment method if one existed", async () => {
                await dbModelSeeders.seedDirectPaymentMethod({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
                expect(dbPaymentMethod).not.to.have.property("bank");
            });
        });
        describe("Direct", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id" "account-id"`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.DIRECT);
                expect(dbPaymentMethod).to.have.property("bank", "bank-id");
                expect(dbPaymentMethod).to.have.property("account", "account-id");
            });
            it("should change the employee's payment method if one existed", async () => {
                await dbModelSeeders.seedHoldPaymentMethod({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id" "account-id"`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.DIRECT);
            });
            it("should do nothing when the account is missing", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id"`);

                const promise = fetchPaymentMethodByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
        describe("Mail", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Mail "my address"`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.MAIL);
                expect(dbPaymentMethod).to.have.property("address", "my address");
            });
            it("should change the employee's payment method if one existed", async () => {
                await dbModelSeeders.seedHoldPaymentMethod({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} Mail "my address"`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.id);
                expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.MAIL);
            });
            it("should do nothing when the address is missing", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Mail `);

                const promise = fetchPaymentMethodByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
    });
    describe("Union", () => {
        describe("Member", () => {
            it("should put the employee in Union", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Member member-123 Dues 10.5`);

                const dbUnionMember = await fetchUnionMemberByEmployeeId(employee.id);
                expect(dbUnionMember).to.have.property("memberId", "member-123");
                expect(dbUnionMember).to.have.property("rate", 10.5);
            });
            it("should do nothing if the employee does not exist", async () => {
                const nonExistingId = generateIndex();
                await executePayrollCommand(`ChgEmp ${nonExistingId} Member member-123 Dues 10.5`);

                const promise = fetchUnionMemberByEmployeeId(nonExistingId);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
            it("should do nothing if the dues rate is not defined", async () => {
                await executePayrollCommand(`ChgEmp ${employee.id} Member member-123 Dues`);

                const promise = fetchUnionMemberByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
            it("should do nothing when the member id is already used", async () => {
                const alreadyUsedUnionMember = await dbModelSeeders.seedUnionMember();

                await executePayrollCommand(`ChgEmp ${employee.id} Member ${alreadyUsedUnionMember.memberId} Dues 20`);

                const promise = fetchUnionMemberByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
        describe("NoMember", () => {
            it("should remove the employee from Union", async () => {
                await dbModelSeeders.seedUnionMember({ employeeId: employee.id });

                await executePayrollCommand(`ChgEmp ${employee.id} NoMember`);

                const promise = fetchUnionMemberByEmployeeId(employee.id);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
    });
});

async function fetchEmployeeById(employeeId: number): Promise<EmployeeDBModel> {
    return dbEmployees.fetch({ id: employeeId });
}
async function fetchPaymentMethodByEmployeeId(employeeId: number): Promise<PaymentMethodDBModel> {
    return dbPaymentMethods.fetch({ employeeId });
}
async function fetchUnionMemberByEmployeeId(employeeId: number): Promise<UnionMemberDBModel> {
    return await dbUnionMembers.fetch({ employeeId });
}
