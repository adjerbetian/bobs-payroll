import "./unit";
import { closeConnection, initConnection, cleanCollections } from "../app";

export * from "./unit";
export { seeders } from "./generators";

before(async function() {
    this.timeout(5000);
    await initConnection();
});
after(async () => closeConnection());
beforeEach(async () => cleanCollections());
