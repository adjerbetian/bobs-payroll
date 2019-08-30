import { buildStubActions, expect, generateServiceCharge, Stub } from "@test/unit";
import { Actions, ServiceCharge } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";

describe("postServiceCharge", () => {
    let stubActions: Stub<Actions>;
    let postServiceCharge: Transaction;

    beforeEach(() => {
        stubActions = buildStubActions();
        postServiceCharge = buildPostServiceChargeTransaction(stubActions);

        stubActions.createServiceCharge.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();

        await postServiceChargeEntity(serviceCharge);

        expect(stubActions.createServiceCharge).to.have.been.calledOnceWith(serviceCharge);
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
