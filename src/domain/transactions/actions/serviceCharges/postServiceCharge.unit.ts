import { buildStubbedCoreActions, entityGenerators, expect, Stub } from "@test/unit";
import { CoreActions, ServiceCharge } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { makePostServiceChargeTransaction } from "./postServiceCharge";

describe("postServiceCharge", () => {
    let stubbedActions: Stub<CoreActions>;
    let postServiceCharge: ReturnType<typeof makePostServiceChargeTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postServiceCharge = makePostServiceChargeTransaction(stubbedActions);

        stubbedActions.createServiceCharge.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = entityGenerators.generateServiceCharge();

        await postServiceChargeEntity(serviceCharge);

        expect(stubbedActions.createServiceCharge).to.have.been.calledOnceWithEntity(serviceCharge);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const serviceCharge = entityGenerators.generateServiceCharge();

        const promise = postServiceCharge(`${serviceCharge.getMemberId()}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "ServiceCharge");
    });

    async function postServiceChargeEntity(serviceCharge: ServiceCharge): Promise<void> {
        return postServiceCharge(`${serviceCharge.getMemberId()}`, `${serviceCharge.getAmount()}`);
    }
});
