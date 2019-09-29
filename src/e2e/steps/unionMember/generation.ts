import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { store } from "../../utils";

Given("a union membership {string} for {string}", async (name: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const unionMember = await seeders.seedUnionMember({ employeeId: employee.getId() });
    store.unionMembers.set(name, unionMember);
});
Given("a new union membership {string} for {string}", (name: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const unionMember = generators.generateUnionMember({ employeeId: employee.getId() });
    store.unionMembers.set(name, unionMember);
});
Given(
    "a union membership {string} for {string} with the same member id as {string}",
    (newMembershipName: string, employeeName: string, oldMembershipName: string) => {
        const oldMembership = store.unionMembers.get(oldMembershipName);
        const employee = store.employees.get(employeeName);

        const unionMember = generators.generateUnionMember({
            employeeId: employee.getId(),
            memberId: oldMembership.getMemberId()
        });
        store.unionMembers.set(newMembershipName, unionMember);
    }
);
