import { sandbox } from "../utils";
import { Hooks } from "./hooks";

export const unitHooks: Hooks = {
    beforeEach() {
        sandbox.restore();
    }
};
