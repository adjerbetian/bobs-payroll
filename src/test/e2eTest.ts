import { execute } from "./utils";

export { expect } from "./integrationTest";
export { execute } from "./utils";

before(async function() {
    this.timeout(5000);
    await execute("npm run build");
});
