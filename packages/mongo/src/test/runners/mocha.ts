import { mapHooksToMocha } from "@bobs-payroll/test";
import { mongoHooks } from "../hooks";

mapHooksToMocha(mongoHooks);
