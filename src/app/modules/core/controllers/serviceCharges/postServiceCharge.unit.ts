import { generators, expect, Stub } from "@test/unit";
import { RouteFormatError } from "../../../../router";
import { CoreActions, ServiceCharge, ServiceChargeCreationModel } from "../../domain";
import { buildStubbedCoreActions } from "../test";
import { makePostServiceChargeController } from "./postServiceCharge";

describe("postServiceCharge", () => {
    let stubbedActions: Stub<CoreActions>;
    let postServiceCharge: ReturnType<typeof makePostServiceChargeController>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postServiceCharge = makePostServiceChargeController(stubbedActions);

        stubbedActions.createServiceCharge.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generators.generateServiceCharge();

        await postServiceChargeEntity(serviceCharge);

        const requestModel: ServiceChargeCreationModel = {
            memberId: serviceCharge.getMemberId(),
            amount: serviceCharge.getAmount()
        };
        expect(stubbedActions.createServiceCharge).to.have.been.calledOnceWith(requestModel);
    });
    it("should throw a RouteFormatError if the amount is missing", async () => {
        const serviceCharge = generators.generateServiceCharge();

        const promise = postServiceCharge(`${serviceCharge.getMemberId()}`, ``);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "ServiceCharge");
    });

    async function postServiceChargeEntity(serviceCharge: ServiceCharge): Promise<void> {
        return postServiceCharge(`${serviceCharge.getMemberId()}`, `${serviceCharge.getAmount()}`);
    }
});
