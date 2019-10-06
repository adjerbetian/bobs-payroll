import { Hooks } from "@bobs-payroll/test";
import { cleanCollections, closeConnection, initConnection } from "../databases";

export const mongoHooks: Hooks = {
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
