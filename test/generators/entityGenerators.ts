import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    buildSalesReceipt,
    buildTimeCard,
    buildUnionMember
} from "../../src";
import { dbModelGenerators as g } from "./dbModelGenerators";

export const entityGenerators = {
    generateHourlyEmployee: buildEntityGenerator(g.generateHourlyEmployee, buildHourlyEmployee),
    generateSalariedEmployee: buildEntityGenerator(g.generateSalariedEmployee, buildSalariedEmployee),
    generateCommissionedEmployee: buildEntityGenerator(g.generateCommissionedEmployee, buildCommissionedEmployee),
    generateTimeCard: buildEntityGenerator(g.generateTimeCard, buildTimeCard),
    generateUnionMember: buildEntityGenerator(g.generateUnionMember, buildUnionMember),
    generateSalesReceipt: buildEntityGenerator(g.generateSalesReceipt, buildSalesReceipt)
};

function buildEntityGenerator<DBModel, Entity>(
    generator: (args: Partial<DBModel>) => DBModel,
    entityBuilder: (args: DBModel) => Entity
): (args?: Partial<DBModel>) => Entity {
    return function(args = {}) {
        const dbModel = generator(args);
        return entityBuilder(dbModel);
    };
}
