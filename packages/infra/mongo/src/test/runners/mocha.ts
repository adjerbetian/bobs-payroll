import { mapHooksToMocha } from "@payroll/test";
import { mongoHooks } from "../hooks";

mapHooksToMocha(mongoHooks);
