import "./unitTest";
import { closeConnection, initConnection } from "../src/db";

export * from "./unitTest";

before(async function() {
    this.timeout(5000);
    await initConnection();
});
after(async () => closeConnection());
