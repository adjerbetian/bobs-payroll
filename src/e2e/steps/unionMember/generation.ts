import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { UnionMember } from "../../../app";
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
        const unionMember = await seedOrGenerate();
        if (membershipName) {
            store.unionMembers.set(membershipName, unionMember);
        }

        async function seedOrGenerate(): Promise<UnionMember> {
            const partialUnionMember = {
                employeeId: getEmployeeId(),
                memberId: memberId,
                rate: toFloat(rate)
            };

            if (isNew) return generators.generateUnionMember(partialUnionMember);
            else return await seeders.seedUnionMember(partialUnionMember);
        }
        function getEmployeeId(): number {
            const employee = store.employees.get(employeeName);
            return employee.getId();
        }
    }
);
