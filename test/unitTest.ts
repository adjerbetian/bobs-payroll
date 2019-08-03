import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinonChai from "sinon-chai";
import * as sinon from "sinon";

const sandbox = sinon.createSandbox();

chai.use(chaiAsPromised);
chai.use(sinonChai);

export const expect = chai.expect;

afterEach((): void => sandbox.restore());
