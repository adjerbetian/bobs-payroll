import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { store } from "../../utils";

Given("a new service charge {string} for {string}", async (serviceChargeName: string, employeeName: string) => {
    const unionMember = store.unionMembers.get(employeeName);

    const serviceCharge = generators.generateServiceCharge({ memberId: unionMember.getMemberId() });
    store.serviceCharges.set(serviceChargeName, serviceCharge);
});
Given("a service charge {string} for {string}", async (serviceChargeName: string, employeeName: string) => {
    const unionMember = store.unionMembers.get(employeeName);

    const serviceCharge = await seeders.seedServiceCharge({ memberId: unionMember.getMemberId() });
    store.serviceCharges.set(serviceChargeName, serviceCharge);
});
