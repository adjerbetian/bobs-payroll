import { execute } from "../utils";
import { buildHooks, Hooks } from "./hooks";

export const e2eHooks: Hooks = buildHooks({
    async before() {
        if (process.platform == "win32") {
            await execute(`IF EXIST dist\\ RMDIR dist /S /Q`);
        } else {
            await execute(`rm -rf dist`);
        }
        await execute("npm run build");
    }
});
