import { closeConnection, initConnection } from "../src/db";
import { execute } from "./utils";

export * from "./unitTest";
export { execute } from "./utils";

before(async function() {
    this.timeout(5000);
    await Promise.all([initConnection(), execute("npm run build")]);
});
after(async () => closeConnection());
