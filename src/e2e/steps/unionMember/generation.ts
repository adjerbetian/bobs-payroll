import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { UnionMember } from "../../../app";
import { store } from "../../utils";

Given(
    /a( new)? union membership (\w+) for (\w+)(?: with the same member id as (\w+))?/,
    async (
        isNew: string | undefined,
        newMembershipName: string,
        employeeName: string,
        oldMembershipName: string | undefined
    ) => {
        const unionMember = await seedOrGenerate();
        store.unionMembers.set(newMembershipName, unionMember);

        async function seedOrGenerate(): Promise<UnionMember> {
            const partialUnionMember = {
                employeeId: getEmployeeId(),
                memberId: getMemberId()
            };

            if (isNew) return generators.generateUnionMember(partialUnionMember);
            else return await seeders.seedUnionMember(partialUnionMember);
        }
        function getEmployeeId(): number {
            const employee = store.employees.get(employeeName);
            return employee.getId();
        }
        function getMemberId(): string | undefined {
            if (!oldMembershipName) return;

            const oldMembership = store.unionMembers.get(oldMembershipName);
            return oldMembership.getMemberId();
        }
    }
);
