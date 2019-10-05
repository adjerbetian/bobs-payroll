import { e2eHooks, integrationHooks, mapHooksToCucumber, unitHooks } from "./hooks";
import { execute } from "./utils";

export * from "./utils";
export { seeders, generators, generateIndex, generateFloatBetween } from "./generators";

mapHooksToCucumber(unitHooks);
mapHooksToCucumber(integrationHooks);
mapHooksToCucumber(e2eHooks);

export async function executePayrollCommand(command: string): Promise<string> {
    return await execute("node dist/main.js " + command);
}
