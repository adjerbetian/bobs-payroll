import { SinonStub } from "sinon";
import { expect, sandbox } from "../test/unitTest";
import { App, buildApp } from "./app";

describe("app", () => {
    let app: App;
    let fakeInitConnection: SinonStub;
    let fakeCloseConnection: SinonStub;
    let fakeProcessTransaction: SinonStub;

    beforeEach(() => {
        fakeInitConnection = sandbox.stub();
        fakeCloseConnection = sandbox.stub();
        fakeProcessTransaction = sandbox.stub();

        app = buildApp({
            initConnection: fakeInitConnection,
            closeConnection: fakeCloseConnection,
            processTransaction: fakeProcessTransaction
        });
    });

    describe("run", () => {
        it("should call initConnection before calling processTransaction", async () => {
            await app.run();

            expect(fakeInitConnection).to.have.been.calledBefore(fakeProcessTransaction);
        });
        it("should call closeConnection after calling processTransaction", async () => {
            await app.run();

            expect(fakeCloseConnection).to.have.been.calledAfter(fakeProcessTransaction);
        });
        it("should call processTransaction with the command arguments", async () => {
            sandbox.stub(process, "argv").value(["executionPath", "jsFile", "command", "arg1", "arg2"]);

            await app.run();

            expect(fakeProcessTransaction).to.have.been.calledOnceWith(["command", "arg1", "arg2"]);
        });
    });
});
