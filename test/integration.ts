import "./unit";
import { closeConnection, initConnection, cleanCollections } from "../src";

export * from "./unit";
export * from "./utils/seeders";

before(async function() {
    this.timeout(5000);
    await initConnection();
});
after(async () => closeConnection());
beforeEach(async () => cleanCollections());
