import { integrationHooks, mapHooksToCucumber, unitHooks } from "@bobs-payroll/test";
import { setDefaultTimeout } from "cucumber";
import { store } from "../utils";

const ONE_SECOND = 1000;
setDefaultTimeout(10 * ONE_SECOND);

mapHooksToCucumber(unitHooks);
mapHooksToCucumber(integrationHooks);
mapHooksToCucumber({ before: store.reset });
