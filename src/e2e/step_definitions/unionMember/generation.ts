import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { store } from "../../utils";

Given("a union membership for {string}", async (employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const unionMember = await seeders.seedUnionMember({ employeeId: employee.getId() });
    store.unionMembers.set(employeeName, unionMember);
});
Given("a new union membership for {string}", (employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const unionMember = generators.generateUnionMember({ employeeId: employee.getId() });
    store.unionMembers.set(employeeName, unionMember);
});
