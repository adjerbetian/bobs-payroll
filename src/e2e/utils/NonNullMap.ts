export interface NonNullMap<T> {
    get(name: string): T;
    set(name: string, entity: T): void;
    reset(): void;
}

export function buildNonNullMap<T>(): NonNullMap<T> {
    const map = new Map<string, T>();
    return {
        get(name) {
            const result = map.get(name);
            if (!result) throw new Error(`"${name}" not defined`);
            return result;
        },
        set(name, entity) {
            map.set(name, entity);
        },
        reset() {
            map.clear();
        }
    };
}
