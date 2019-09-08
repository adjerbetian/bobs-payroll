import { execute } from "./utils";

export * from "./integration";
export * from "./utils/execute";
export * from "./utils/seeders"; // todo: to remove

before(async () => {
    await execute(`IF EXIST dist\\ RMDIR dist /S /Q`);
    await execute("npm run build");
});

export async function executePayrollCommand(command: string): Promise<string> {
    return await execute("node dist/main.js " + command);
}
