import { After, AfterAll, Before, BeforeAll } from "cucumber";

export function buildHooks(args: Partial<Hooks>): Hooks {
    return {
        before: doNothing,
        beforeEach: doNothing,
        afterEach: doNothing,
        after: doNothing,
        ...args
    };

    async function doNothing(): Promise<void> {
        return;
    }
}

export function mapHooksToMocha(hooks: Hooks): void {
    before(hooks.before);
    beforeEach(hooks.beforeEach);
    afterEach(hooks.afterEach);
    after(hooks.after);
}

export function mapHooksToCucumber(hooks: Hooks): void {
    BeforeAll(hooks.before);
    Before(hooks.beforeEach);
    After(hooks.afterEach);
    AfterAll(hooks.after);
}

export interface Hooks {
    before(): Promise<void>;
    beforeEach(): Promise<void>;
    afterEach(): Promise<void>;
    after(): Promise<void>;
}
