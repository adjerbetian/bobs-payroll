import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbServiceCharges } from "../../../app";
import { store } from "../../utils";

Then("{string} should have the service charge {string}", async (employeeName: string, serviceChargeName: string) => {
    const unionMember = store.unionMembers.get(employeeName);
    const serviceCharge = store.serviceCharges.get(serviceChargeName);

    const serviceChargesInDB = await dbServiceCharges.fetchAll({ memberId: unionMember.getMemberId() });
    expect(serviceChargesInDB).entities.to.include(serviceCharge);
});
Then(
    "{string} should not have the service charge {string}",
    async (employeeName: string, serviceChargeName: string) => {
        const unionMember = store.unionMembers.get(employeeName);
        const serviceCharge = store.serviceCharges.get(serviceChargeName);

        const serviceChargesInDB = await dbServiceCharges.fetchAll({ memberId: unionMember.getMemberId() });
        expect(serviceChargesInDB).entities.not.to.include(serviceCharge);
    }
);
