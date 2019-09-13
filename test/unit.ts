import { chaiEntity } from "@test/chai/chaiEntity";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinonChai from "sinon-chai";
import * as sinon from "sinon";

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEntity);

export const expect = chai.expect;
export const sandbox = sinon.createSandbox();

afterEach((): void => sandbox.restore());

export * from "./utils/dates";
export * from "./utils/stubBuilder";
export { entityGenerators, dbModelGenerators, generateIndex, generateFloatBetween } from "./generators";
