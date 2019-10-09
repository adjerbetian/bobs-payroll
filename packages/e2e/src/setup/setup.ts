import { mongoHooks } from "@payroll/mongo/test";
import { Hooks, unitHooks } from "@payroll/test";
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from "cucumber";
import { store } from "../utils";

const ONE_SECOND = 1000;
setDefaultTimeout(10 * ONE_SECOND);

mapHooksToCucumber(unitHooks);
mapHooksToCucumber(mongoHooks);
mapHooksToCucumber({ before: store.reset });

export function mapHooksToCucumber(hooks: Hooks): void {
    if (hooks.before) BeforeAll(hooks.before);
    if (hooks.beforeEach) Before(hooks.beforeEach);
    if (hooks.afterEach) After(hooks.afterEach);
    if (hooks.after) AfterAll(hooks.after);
}
