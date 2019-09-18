import { expect, Stub } from "@test/unit";
import { buildStubFor } from "@test/utils/stubBuilder";
import { RoutingError } from "./errors";
import { Controller, Logger, makeRouter, Router, Routes } from "./router";

describe("processTransaction", () => {
    let router: Router;
    let controller: Stub<Controller>;
    let logger: Stub<Logger>;

    beforeEach(() => {
        controller = buildStubFor("controller").resolves();
        const routes: Routes = {
            MyRoute: controller
        };
        logger = buildStubFor({ log: true });
        router = makeRouter(routes, logger);
    });

    describe("processCommand", () => {
        it("should call the controller when the route exists", async () => {
            controller.resolves();

            await router.processCommand("MyRoute", "arg1", "arg2", "arg3", "", "arg5");

            expect(controller).to.have.been.calledOnceWith("arg1", "arg2", "arg3", "", "arg5");
        });
        it("should log the error when the controller throws", async () => {
            logger.log.resolves();
            const error = new Error("domain error");
            controller.rejects(error);

            await router.processCommand("MyRoute", "arg1", "arg2", "arg3", "", "arg5");

            expect(logger.log).to.have.been.calledOnceWith("AN ERROR HAS OCCURRED", error);
        });
        it("should throw when the route does not exist", async () => {
            logger.log.resolves();

            await router.processCommand("NonExistingRoute", "arg1", "arg2", "arg3", "", "arg5");

            expect(logger.log).to.have.been.calledOnceWith("AN ERROR HAS OCCURRED");
            expect(logger.log.getCall(0).args[1]).to.be.an.instanceOf(RoutingError);
        });
    });
});
