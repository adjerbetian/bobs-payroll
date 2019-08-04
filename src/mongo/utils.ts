export function cleanMongoEntity<T>(entity: T): T {
    // @ts-ignore
    delete entity._id;
    return entity;
}
