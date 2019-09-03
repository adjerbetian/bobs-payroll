import { buildStubbedCoreActions, expect, generateServiceCharge, Stub } from "@test/unit";
import { CoreActions, ServiceCharge } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";

describe("postServiceCharge", () => {
    let stubbedActions: Stub<CoreActions>;
    let postServiceCharge: ReturnType<typeof buildPostServiceChargeTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postServiceCharge = buildPostServiceChargeTransaction(stubbedActions);

        stubbedActions.createServiceCharge.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();

        await postServiceChargeEntity(serviceCharge);

        expect(stubbedActions.createServiceCharge).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const serviceCharge = generateServiceCharge();

        const promise = postServiceCharge(`${serviceCharge.memberId}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "ServiceCharge");
    });

    async function postServiceChargeEntity(serviceCharge: ServiceCharge): Promise<void> {
        return postServiceCharge(`${serviceCharge.memberId}`, `${serviceCharge.amount}`);
    }
});
