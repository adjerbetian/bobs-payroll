import {
    CommissionedEmployee,
    CommissionedEmployeeDBModel,
    DirectPaymentMethod,
    DirectPaymentMethodDBModel,
    employeeMapper,
    HoldPaymentMethod,
    HoldPaymentMethodDBModel,
    HourlyEmployee,
    HourlyEmployeeDBModel,
    MailPaymentMethod,
    MailPaymentMethodDBModel,
    Mapper,
    paymentMapper,
    paymentMethodMapper,
    SalariedEmployee,
    SalariedEmployeeDBModel,
    salesReceiptMapper,
    serviceChargeMapper,
    timeCardMapper,
    unionMemberMapper
} from "../../src";
import { dbModelGenerators as g } from "./dbModelGenerators";

export const entityGenerators = {
    generateHourlyEmployee: buildEntityGenerator(g.generateHourlyEmployee, employeeMapper as Mapper<
        HourlyEmployeeDBModel,
        HourlyEmployee
    >),
    generateSalariedEmployee: buildEntityGenerator(g.generateSalariedEmployee, employeeMapper as Mapper<
        SalariedEmployeeDBModel,
        SalariedEmployee
    >),
    generateCommissionedEmployee: buildEntityGenerator(g.generateCommissionedEmployee, employeeMapper as Mapper<
        CommissionedEmployeeDBModel,
        CommissionedEmployee
    >),
    generateTimeCard: buildEntityGenerator(g.generateTimeCard, timeCardMapper),
    generateUnionMember: buildEntityGenerator(g.generateUnionMember, unionMemberMapper),
    generateSalesReceipt: buildEntityGenerator(g.generateSalesReceipt, salesReceiptMapper),
    generateServiceCharge: buildEntityGenerator(g.generateServiceCharge, serviceChargeMapper),
    generateHoldPaymentMethod: buildEntityGenerator(g.generateHoldPaymentMethod, paymentMethodMapper as Mapper<
        HoldPaymentMethodDBModel,
        HoldPaymentMethod
    >),
    generateDirectPaymentMethod: buildEntityGenerator<DirectPaymentMethodDBModel, DirectPaymentMethod>(
        g.generateDirectPaymentMethod,
        paymentMethodMapper as Mapper<DirectPaymentMethodDBModel, DirectPaymentMethod>
    ),
    generateMailPaymentMethod: buildEntityGenerator<MailPaymentMethodDBModel, MailPaymentMethod>(
        g.generateMailPaymentMethod,
        paymentMethodMapper as Mapper<MailPaymentMethodDBModel, MailPaymentMethod>
    ),
    generatePayment: buildEntityGenerator(g.generatePayment, paymentMapper)
};

function buildEntityGenerator<DBModel, Entity>(
    generator: (args: Partial<DBModel>) => DBModel,
    entityMapper: Mapper<DBModel, Entity>
): (args?: Partial<DBModel>) => Entity {
    return function(args = {}) {
        const dbModel = generator(args);
        return entityMapper.toEntity(dbModel);
    };
}
