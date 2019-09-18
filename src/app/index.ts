export * from "./domain";
export * from "./mongo";

import { buildApp } from "./app";

export const app = buildApp();
