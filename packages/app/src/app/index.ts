// export * from "./domain";
export {
    buildDatabase,
    buildMapper,
    Mapper,
    MongoEntity,
    MongoModel,
    closeConnection,
    initConnection,
    cleanCollections
} from "./mongo";
export * from "./modules";

import { buildApp } from "./app";

export const app = buildApp();
