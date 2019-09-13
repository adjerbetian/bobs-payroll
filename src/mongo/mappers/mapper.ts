export interface Mapper<DBModel, Entity> {
    toEntity(model: DBModel): Entity;
    toEntities(models: DBModel[]): Entity[];
    toDBModel(entity: Entity): DBModel;
}

export function buildMapper<DBModel, Entity>(
    basicMapper: Omit<Mapper<DBModel, Entity>, "toEntities">
): Mapper<DBModel, Entity> {
    return {
        ...basicMapper,
        toEntities(models) {
            return models.map(model => basicMapper.toEntity(model));
        }
    };
}
