import { After, AfterAll, Before, BeforeAll } from "cucumber";

export function mapHooksToMocha(hooks: Hooks): void {
    if (hooks.before) before(hooks.before);
    if (hooks.beforeEach) beforeEach(hooks.beforeEach);
    if (hooks.afterEach) afterEach(hooks.afterEach);
    if (hooks.after) after(hooks.after);
}

export function mapHooksToCucumber(hooks: Hooks): void {
    if (hooks.before) BeforeAll(hooks.before);
    if (hooks.beforeEach) Before(hooks.beforeEach);
    if (hooks.afterEach) After(hooks.afterEach);
    if (hooks.after) AfterAll(hooks.after);
}

export interface Hooks {
    before?(): Promise<void> | void;
    beforeEach?(): Promise<void> | void;
    afterEach?(): Promise<void> | void;
    after?(): Promise<void> | void;
}
