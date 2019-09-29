import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { store } from "../../utils";

Given("a new service charge {string} for {string}", async (serviceChargeName: string, membershipName: string) => {
    const unionMember = store.unionMembers.get(membershipName);

    const serviceCharge = generators.generateServiceCharge({ memberId: unionMember.getMemberId() });
    store.serviceCharges.set(serviceChargeName, serviceCharge);
});
Given("a service charge {string} for {string}", async (serviceChargeName: string, membershipName: string) => {
    const unionMember = store.unionMembers.get(membershipName);

    const serviceCharge = await seeders.seedServiceCharge({ memberId: unionMember.getMemberId() });
    store.serviceCharges.set(serviceChargeName, serviceCharge);
});
