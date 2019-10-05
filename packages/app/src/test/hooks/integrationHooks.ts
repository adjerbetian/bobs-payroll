import { cleanCollections, closeConnection, initConnection } from "@bobs-payroll/mongo";
import { buildHooks, Hooks } from "./hooks";

export const integrationHooks: Hooks = buildHooks({
    async before() {
        await initConnection();
    },
    async beforeEach() {
        await cleanCollections();
    },
    async after() {
        await closeConnection();
    }
});
