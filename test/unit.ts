import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinonChai from "sinon-chai";
import * as sinon from "sinon";

chai.use(chaiAsPromised);
chai.use(sinonChai);

export const expect = chai.expect;
export const sandbox = sinon.createSandbox();

afterEach((): void => sandbox.restore());

export * from "./utils/dates";
export * from "./utils/stubBuilders";
export * from "./utils/generators";