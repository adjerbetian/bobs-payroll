import { ServiceCharge } from "@modules/core";
import { generators, seeders } from "@modules/core/test";
import { Given } from "cucumber";
import { store } from "../../utils";

Given(
    /^a( new)? service charge (\w+) for (\w+)$/,
    async (isNew: string | undefined, serviceChargeName: string, membershipName: string) => {
        const serviceCharge = await seedOrGenerate();
        store.serviceCharges.set(serviceChargeName, serviceCharge);

        async function seedOrGenerate(): Promise<ServiceCharge> {
            const unionMembership = store.unionMembers.get(membershipName);
            const partialServiceCharge = { memberId: unionMembership.getMemberId() };

            if (isNew) return generators.generateServiceCharge(partialServiceCharge);
            else return seeders.seedServiceCharge({ memberId: unionMembership.getMemberId() });
        }
    }
);
