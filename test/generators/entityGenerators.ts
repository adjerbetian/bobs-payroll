import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    buildSalesReceipt,
    buildServiceCharge,
    buildTimeCard,
    buildUnionMember,
    DirectPaymentMethod,
    DirectPaymentMethodDBModel,
    HoldPaymentMethod,
    HoldPaymentMethodDBModel,
    MailPaymentMethod,
    MailPaymentMethodDBModel,
    paymentMapper,
    paymentMethodMapper
} from "../../src";
import { dbModelGenerators as g } from "./dbModelGenerators";

export const entityGenerators = {
    generateHourlyEmployee: buildEntityGenerator(g.generateHourlyEmployee, buildHourlyEmployee),
    generateSalariedEmployee: buildEntityGenerator(g.generateSalariedEmployee, buildSalariedEmployee),
    generateCommissionedEmployee: buildEntityGenerator(g.generateCommissionedEmployee, buildCommissionedEmployee),
    generateTimeCard: buildEntityGenerator(g.generateTimeCard, buildTimeCard),
    generateUnionMember: buildEntityGenerator(g.generateUnionMember, buildUnionMember),
    generateSalesReceipt: buildEntityGenerator(g.generateSalesReceipt, buildSalesReceipt),
    generateServiceCharge: buildEntityGenerator(g.generateServiceCharge, buildServiceCharge),
    generateHoldPaymentMethod: buildEntityGenerator<HoldPaymentMethodDBModel, HoldPaymentMethod>(
        g.generateHoldPaymentMethod,
        paymentMethodMapper.toEntity
    ),
    generateDirectPaymentMethod: buildEntityGenerator<DirectPaymentMethodDBModel, DirectPaymentMethod>(
        g.generateDirectPaymentMethod,
        paymentMethodMapper.toEntity
    ),
    generateMailPaymentMethod: buildEntityGenerator<MailPaymentMethodDBModel, MailPaymentMethod>(
        g.generateMailPaymentMethod,
        paymentMethodMapper.toEntity
    ),
    generatePayment: buildEntityGenerator(g.generatePayment, paymentMapper.toEntity)
};

function buildEntityGenerator<DBModel, Entity>(
    generator: (args: Partial<DBModel>) => DBModel,
    dbModelToEntityMapper: (args: DBModel) => Entity
): (args?: Partial<DBModel>) => Entity {
    return function(args = {}) {
        const dbModel = generator(args);
        return dbModelToEntityMapper(dbModel);
    };
}
