import { seeders, executePayrollCommand, expect, generateIndex } from "@test/e2e";
import {
    CommissionedEmployee,
    dbEmployees,
    dbPaymentMethods,
    dbUnionMembers,
    DirectPaymentMethod,
    Employee,
    EmployeeType,
    HourlyEmployee,
    MailPaymentMethod,
    NotFoundError,
    PaymentMethod,
    PaymentMethodType,
    SalariedEmployee,
    UnionMember
} from "../app";

describe("Use Case 6: Changing Employee Details", () => {
    let employee: Employee;

    beforeEach(async () => {
        employee = await seeders.seedHourlyEmployee();
    });

    describe("basic infos", () => {
        it("should change the employee's name", async () => {
            await executePayrollCommand(`ChgEmp ${employee.getId()} Name "James Bond"`);

            const dbEmployee = await fetchEmployeeById(employee.getId());
            expect(dbEmployee.getName()).to.equal("James Bond");
        });
        it("should change the employee's address", async () => {
            await executePayrollCommand(`ChgEmp ${employee.getId()} Address "my new address"`);

            const dbEmployee = await fetchEmployeeById(employee.getId());
            expect(dbEmployee.getAddress()).to.equal("my new address");
        });
        it("should do nothing when the employee does not exist", async () => {
            const nonExistingId = generateIndex();

            await executePayrollCommand(`ChgEmp ${nonExistingId} Address "my new address"`);

            const dbEmployee = await fetchEmployeeById(employee.getId());
            expect(dbEmployee).entity.to.equal(employee);
        });
    });
    describe("type", () => {
        it("should change the employee to hourly", async () => {
            employee = await seeders.seedSalariedEmployee();

            await executePayrollCommand(`ChgEmp ${employee.getId()} Hourly 10`);

            const dbEmployee = (await fetchEmployeeById(employee.getId())) as HourlyEmployee;
            expect(dbEmployee.getType()).to.equal(EmployeeType.HOURLY);
            expect(dbEmployee.getHourlyRate()).to.have.equal(10);
        });
        it("should change the employee to monthly salary", async () => {
            employee = await seeders.seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.getId()} Salaried 2000`);

            const dbEmployee = (await fetchEmployeeById(employee.getId())) as SalariedEmployee;
            expect(dbEmployee.getType()).to.equal(EmployeeType.SALARIED);
            expect(dbEmployee.getSalary()).to.equal(2000);
        });
        it("should change the employee to commissioned", async () => {
            employee = await seeders.seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.getId()} Commissioned 2000 0.01`);

            const dbEmployee = (await fetchEmployeeById(employee.getId())) as CommissionedEmployee;
            expect(dbEmployee.getType()).to.equal(EmployeeType.COMMISSIONED);
            expect(dbEmployee.getSalary()).to.equal(2000);
            expect(dbEmployee.getCommissionRate()).to.equal(0.01);
        });
    });
    describe("payment method", () => {
        describe("Hold", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Hold`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.getId());
                expect(dbPaymentMethod.getType()).to.equal(PaymentMethodType.HOLD);
            });
            it("should change the employee's payment method if one existed", async () => {
                await seeders.seedDirectPaymentMethod({ employeeId: employee.getId() });

                await executePayrollCommand(`ChgEmp ${employee.getId()} Hold`);

                const dbPaymentMethod = await fetchPaymentMethodByEmployeeId(employee.getId());
                expect(dbPaymentMethod.getType()).to.equal(PaymentMethodType.HOLD);
            });
        });
        describe("Direct", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Direct "bank-id" "account-id"`);

                const dbPaymentMethod = (await fetchPaymentMethodByEmployeeId(employee.getId())) as DirectPaymentMethod;
                expect(dbPaymentMethod.getType()).to.equal(PaymentMethodType.DIRECT);
                expect(dbPaymentMethod.getBank()).to.equal("bank-id");
                expect(dbPaymentMethod.getAccount()).to.equal("account-id");
            });
            it("should change the employee's payment method if one existed", async () => {
                await seeders.seedHoldPaymentMethod({ employeeId: employee.getId() });

                await executePayrollCommand(`ChgEmp ${employee.getId()} Direct "bank-id" "account-id"`);

                const dbPaymentMethod = (await fetchPaymentMethodByEmployeeId(employee.getId())) as DirectPaymentMethod;
                expect(dbPaymentMethod.getType()).to.equal(PaymentMethodType.DIRECT);
            });
            it("should do nothing when the account is missing", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Direct "bank-id"`);

                const promise = fetchPaymentMethodByEmployeeId(employee.getId());
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
        describe("Mail", () => {
            it("should set the employee's payment method", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Mail "my address"`);

                const dbPaymentMethod = (await fetchPaymentMethodByEmployeeId(employee.getId())) as MailPaymentMethod;
                expect(dbPaymentMethod.getType()).to.equal(PaymentMethodType.MAIL);
                expect(dbPaymentMethod.getAddress()).to.equal("my address");
            });
            it("should change the employee's payment method if one existed", async () => {
                await seeders.seedHoldPaymentMethod({ employeeId: employee.getId() });

                await executePayrollCommand(`ChgEmp ${employee.getId()} Mail "my address"`);

                const dbPaymentMethod = (await fetchPaymentMethodByEmployeeId(employee.getId())) as MailPaymentMethod;
                expect(dbPaymentMethod.getType()).to.equal(PaymentMethodType.MAIL);
            });
            it("should do nothing when the address is missing", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Mail `);

                const promise = fetchPaymentMethodByEmployeeId(employee.getId());
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
    });
    describe("Union", () => {
        describe("Member", () => {
            it("should put the employee in Union", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Member member-123 Dues 10.5`);

                const unionMember = await fetchUnionMemberByEmployeeId(employee.getId());
                expect(unionMember.getMemberId()).to.equal("member-123");
                expect(unionMember.getRate()).to.equal(10.5);
            });
            it("should do nothing if the employee does not exist", async () => {
                const nonExistingId = generateIndex();
                await executePayrollCommand(`ChgEmp ${nonExistingId} Member member-123 Dues 10.5`);

                const promise = fetchUnionMemberByEmployeeId(nonExistingId);
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
            it("should do nothing if the dues rate is not defined", async () => {
                await executePayrollCommand(`ChgEmp ${employee.getId()} Member member-123 Dues`);

                const promise = fetchUnionMemberByEmployeeId(employee.getId());
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
            it("should do nothing when the member id is already used", async () => {
                const alreadyUsedUnionMember = await seeders.seedUnionMember();

                await executePayrollCommand(
                    `ChgEmp ${employee.getId()} Member ${alreadyUsedUnionMember.getMemberId()} Dues 20`
                );

                const promise = fetchUnionMemberByEmployeeId(employee.getId());
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
        describe("NoMember", () => {
            it("should remove the employee from Union", async () => {
                await seeders.seedUnionMember({ employeeId: employee.getId() });

                await executePayrollCommand(`ChgEmp ${employee.getId()} NoMember`);

                const promise = fetchUnionMemberByEmployeeId(employee.getId());
                await expect(promise).to.be.rejectedWith(NotFoundError);
            });
        });
    });
});

async function fetchEmployeeById(employeeId: number): Promise<Employee> {
    return dbEmployees.fetch({ id: employeeId });
}
async function fetchPaymentMethodByEmployeeId(employeeId: number): Promise<PaymentMethod> {
    return dbPaymentMethods.fetch({ employeeId });
}
async function fetchUnionMemberByEmployeeId(employeeId: number): Promise<UnionMember> {
    return await dbUnionMembers.fetch({ employeeId });
}
