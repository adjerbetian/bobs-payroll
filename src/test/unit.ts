import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinonChai from "sinon-chai";
import { chaiEntity } from "./chai-entity";
import { sandbox } from "./utils";

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEntity);

export const expect = chai.expect;

afterEach((): void => sandbox.restore());

export * from "./utils";
export { generators, generateIndex, generateFloatBetween } from "./generators";
