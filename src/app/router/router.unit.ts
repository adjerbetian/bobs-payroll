import { expect, Stub } from "@test/unit";
import { buildStubFor } from "@test/utils/stubBuilder";
import { RoutingError } from "./errors";
import { Logger, buildRouter, Router, Routes } from "./router";

describe("processTransaction", () => {
    let router: Router;
    let logger: Stub<Logger>;

    beforeEach(() => {
        logger = buildStubFor({ log: true });
        router = buildRouter(logger);
    });

    describe("addRoutes", () => {
        it("should set the routes on the first call", async () => {
            const routes = {
                MyRoute1: buildStubFor("controller1").resolves(),
                MyRoute2: buildStubFor("controller2").resolves()
            };
            router.addRoutes(routes);

            await router.processCommand("MyRoute1");
            expect(routes.MyRoute1).to.have.been.calledOnce;

            await router.processCommand("MyRoute2");
            expect(routes.MyRoute2).to.have.been.calledOnce;
        });
        it("should add the routes", async () => {
            router.addRoutes({ firstRoute: buildStubFor("firstRouteController") });
            const routes = { secondRoute: buildStubFor("secondRouteController").resolves() };
            router.addRoutes(routes);

            await router.processCommand("secondRoute");

            expect(routes.secondRoute).to.have.been.calledOnce;
        });
        it("should override the route when it already existed", async () => {
            router.addRoutes({ route: buildStubFor("firstController") });
            const routes = { route: buildStubFor("secondController").resolves() };
            router.addRoutes(routes);

            await router.processCommand("route");

            expect(routes.route).to.have.been.calledOnce;
        });
    });
    describe("processCommand", () => {
        let controller: Stub;

        beforeEach(() => {
            controller = buildStubFor("controller").resolves();
            const routes: Routes = {
                MyRoute: controller
            };
            router.addRoutes(routes);
        });

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
