import "./unitTest";
import { closeConnection, initConnection, cleanCollections } from "../src/mongo";

export { expect } from "./unitTest";

before(async function() {
    this.timeout(5000);
    await initConnection();
});
after(async () => closeConnection());
beforeEach(async () => cleanCollections());
