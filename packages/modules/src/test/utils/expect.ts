import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinonChai from "sinon-chai";
import { chaiEntity } from "../chai-entity";

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiEntity);

export const expect = chai.expect;
