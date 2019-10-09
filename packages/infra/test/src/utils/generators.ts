import { random, round } from "lodash";

export interface EntityGenerator<EntityFactory extends (args: any) => any> {
    (args?: Partial<Parameters<EntityFactory>[0]>): ReturnType<EntityFactory>;
}

export interface EntitySeeder<EntityFactory extends (args: any) => any> {
    (args?: Partial<Parameters<EntityFactory>[0]>): Promise<ReturnType<EntityFactory>>;
}

export function buildSeeder<EntityFactory extends (args: any) => any>(
    generator: EntityGenerator<EntityFactory>,
    inserter: { insert: (entity: ReturnType<EntityFactory>) => Promise<void> }
): EntitySeeder<EntityFactory> {
    return async function(args = {}) {
        const entity = generator(args);
        await inserter.insert(entity);
        return entity;
    };
}

export const generateIndex = (() => {
    let index = random(1, 100);
    return () => index++;
})();

export function generateFloatBetween(min: number, max: number): number {
    return round(random(min, max, true), 2);
}
