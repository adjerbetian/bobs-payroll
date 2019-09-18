export interface Mapper<Entity, DBModel> {
    toEntity(model: DBModel): Entity;
    toEntities(models: DBModel[]): Entity[];
    toDBModel(entity: Entity): DBModel;
}

export function buildMapper<Entity, DBModel>(
    basicMapper: Omit<Mapper<Entity, DBModel>, "toEntities">
): Mapper<Entity, DBModel> {
    return {
        ...basicMapper,
        toEntities(models) {
            return models.map(model => basicMapper.toEntity(model));
        }
    };
}
