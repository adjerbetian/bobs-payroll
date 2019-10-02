import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { ServiceCharge } from "../../../app";
import { store } from "../../utils";

Given(
    /^a( new)? service charge (\w+) for (\w+)$/,
    async (isNew: string | undefined, serviceChargeName: string, membershipName: string) => {
        const serviceCharge = await seedOrGenerate();
        store.serviceCharges.set(serviceChargeName, serviceCharge);

        async function seedOrGenerate(): Promise<ServiceCharge> {
            const unionMember = store.unionMembers.get(membershipName);
            const partialServiceCharge = { memberId: unionMember.getMemberId() };

            if (isNew) return generators.generateServiceCharge(partialServiceCharge);
            else return seeders.seedServiceCharge({ memberId: unionMember.getMemberId() });
        }
    }
);
