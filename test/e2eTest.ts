import { execute } from "./utils";

export * from "./integrationTest";

before(async () => {
    await execute("IF EXIST dist\\ DEL /F/Q/S dist\\*.*");
    await execute("npm run build");
});

export async function executePayrollCommand(command: string): Promise<string> {
    return await execute("node dist/main.js " + command);
}
