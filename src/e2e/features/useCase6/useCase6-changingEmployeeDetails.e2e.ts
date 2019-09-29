import { executePayrollCommand, expect, generateIndex, seeders } from "@test/e2e";
import { dbUnionMembers, Employee, NotFoundError, UnionMember } from "../../../app";

describe("Use Case 6: Changing Employee Details", () => {
    let employee: Employee;

    beforeEach(async () => {
        employee = await seeders.seedHourlyEmployee();
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

async function fetchUnionMemberByEmployeeId(employeeId: number): Promise<UnionMember> {
    return await dbUnionMembers.fetch({ employeeId });
}
