import { cleanCollections, closeConnection, initConnection } from "@bobs-payroll/mongo";
import { Hooks } from "./hooks";

export const integrationHooks: Hooks = {
    async before() {
        await initConnection();
    },
    async beforeEach() {
        await cleanCollections();
    },
    async after() {
        await closeConnection();
    }
};
