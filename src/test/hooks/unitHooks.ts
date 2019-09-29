import { sandbox } from "../utils";
import { buildHooks, Hooks } from "./hooks";

export const unitHooks: Hooks = buildHooks({
    async beforeEach() {
        sandbox.restore();
    }
});
