export * from "./domain";
export * from "./mongo";
export * from "./modules";

import { buildApp } from "./app";

export const app = buildApp();
