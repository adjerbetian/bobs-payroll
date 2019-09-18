import { execute } from "./utils";

export * from "./integration";

before(async () => {
    if (process.platform == "win32") {
        await execute(`IF EXIST dist\\ RMDIR dist /S /Q`);
    } else {
        await execute(`rm -rf dist`);
    }
    await execute("npm run build");
});

export async function executePayrollCommand(command: string): Promise<string> {
    return await execute("node dist/main.js " + command);
}