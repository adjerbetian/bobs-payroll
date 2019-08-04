import { execute } from "./utils";

export { expect } from "./integrationTest";
export { execute } from "./utils";

before(async function() {
    this.timeout(5000);
    await execute("npm run build");
});

export async function executePayrollCommand(command: string): Promise<void> {
    const output = await execute("node dist/index.js " + command);
    console.log(output);
}
