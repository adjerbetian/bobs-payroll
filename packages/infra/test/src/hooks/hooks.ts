export function mapHooksToMocha(hooks: Hooks): void {
    if (hooks.before) before(hooks.before);
    if (hooks.beforeEach) beforeEach(hooks.beforeEach);
    if (hooks.afterEach) afterEach(hooks.afterEach);
    if (hooks.after) after(hooks.after);
}

export interface Hooks {
    before?(): Promise<void> | void;
    beforeEach?(): Promise<void> | void;
    afterEach?(): Promise<void> | void;
    after?(): Promise<void> | void;
}
