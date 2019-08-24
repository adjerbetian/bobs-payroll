import { execute, ExecuteOptions } from "./utils";

export { expect } from "./integrationTest";
export { execute } from "./utils";

before(async () => {
    await execute("IF EXIST dist\\ DEL /F/Q/S dist\\*.*");
    await execute("npm run build");
});

export async function executePayrollCommand(command: string, options?: ExecuteOptions): Promise<void> {
    await execute("node dist/main.js " + command, options);
}
