import { mapHooksToCucumber } from "@bobs-payroll/test";
import { mongoHooks } from "../hooks";

mapHooksToCucumber(mongoHooks);
