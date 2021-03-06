import { expect, Stub } from "@infra/test";
import { generators } from "../../test";
import { CoreUseCases, ServiceCharge, ServiceChargeCreationModel } from "../../domain";
import { RouteFormatError } from "../errors";
import { buildStubbedCoreUseCases } from "../test";
import { makePostServiceChargeController } from "./postServiceCharge";

describe("postServiceCharge", () => {
    let stubbedUseCases: Stub<CoreUseCases>;
    let postServiceCharge: ReturnType<typeof makePostServiceChargeController>;

    beforeEach(() => {
        stubbedUseCases = buildStubbedCoreUseCases();
        postServiceCharge = makePostServiceChargeController(stubbedUseCases);

        stubbedUseCases.createServiceCharge.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generators.generateServiceCharge();

        await postServiceChargeEntity(serviceCharge);

        const requestModel: ServiceChargeCreationModel = {
            memberId: serviceCharge.getMemberId(),
            amount: serviceCharge.getAmount()
        };
        expect(stubbedUseCases.createServiceCharge).to.have.been.calledOnceWith(requestModel);
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
