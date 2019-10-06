import { UnionMembership } from "@bobs-payroll/modules";
import { generators, seeders } from "@bobs-payroll/modules/test";
import { Given } from "cucumber";
import { store, toFloat } from "../../utils";

Given(
    /^a( new)? union membership(?: (\w+))? for (\w+)(?: with the member id (\w+))?(?: (?:with|and) a rate of (\d+\.?\d*))?$/,
    async (
        isNew: string | undefined,
        membershipName: string | undefined,
        employeeName: string,
        memberId: string | undefined,
        rate: string | undefined
    ) => {
        const unionMembership = await seedOrGenerate();
        if (membershipName) {
            store.unionMembers.set(membershipName, unionMembership);
        }

        async function seedOrGenerate(): Promise<UnionMembership> {
            const partialUnionMembership = {
                employeeId: getEmployeeId(),
                memberId: memberId,
                rate: toFloat(rate)
            };

            if (isNew) return generators.generateUnionMembership(partialUnionMembership);
            else return await seeders.seedUnionMembership(partialUnionMembership);
        }
        function getEmployeeId(): number {
            const employee = store.employees.get(employeeName);
            return employee.getId();
        }
    }
);
