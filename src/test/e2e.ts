import { e2eHooks, mapHooksToMocha } from "./hooks";
import { execute } from "./utils";

mapHooksToMocha(e2eHooks);

export * from "./integration";
export async function executePayrollCommand(command: string): Promise<string> {
    return await execute("node dist/main.js " + command);
}
