import { mapHooksToMocha } from "@infra/test";
import { mongoHooks } from "../hooks";

mapHooksToMocha(mongoHooks);
