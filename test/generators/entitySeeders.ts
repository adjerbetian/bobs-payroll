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
import { dbModelSeeders as seeders } from "./dbModelSeeders";

export const entitySeeders = {
    seedHourlyEmployee: buildEntitySeeder(seeders.seedHourlyEmployee, employeeMapper as Mapper<
        HourlyEmployeeDBModel,
        HourlyEmployee
    >),
    seedSalariedEmployee: buildEntitySeeder(seeders.seedSalariedEmployee, employeeMapper as Mapper<
        SalariedEmployeeDBModel,
        SalariedEmployee
    >),
    seedCommissionedEmployee: buildEntitySeeder(seeders.seedCommissionedEmployee, employeeMapper as Mapper<
        CommissionedEmployeeDBModel,
        CommissionedEmployee
    >),
    seedUnionMember: buildEntitySeeder(seeders.seedUnionMember, unionMemberMapper),
    seedTimeCard: buildEntitySeeder(seeders.seedTimeCard, timeCardMapper),
    seedSalesReceipt: buildEntitySeeder(seeders.seedSalesReceipt, salesReceiptMapper),
    seedServiceCharge: buildEntitySeeder(seeders.seedServiceCharge, serviceChargeMapper),
    seedHoldPaymentMethod: buildEntitySeeder(seeders.seedHoldPaymentMethod, paymentMethodMapper as Mapper<
        HoldPaymentMethodDBModel,
        HoldPaymentMethod
    >),
    seedDirectPaymentMethod: buildEntitySeeder(seeders.seedDirectPaymentMethod, paymentMethodMapper as Mapper<
        DirectPaymentMethodDBModel,
        DirectPaymentMethod
    >),
    seedMailPaymentMethod: buildEntitySeeder(seeders.seedMailPaymentMethod, paymentMethodMapper as Mapper<
        MailPaymentMethodDBModel,
        MailPaymentMethod
    >),
    seedPayment: buildEntitySeeder(seeders.seedPayment, paymentMapper)
};

function buildEntitySeeder<DBModel, Entity>(
    seeder: (args: Partial<DBModel>) => Promise<DBModel>,
    entityMapper: Mapper<DBModel, Entity>
): (args?: Partial<DBModel>) => Promise<Entity> {
    return async function(args = {}) {
        const dbModel = await seeder(args);
        return entityMapper.toEntity(dbModel);
    };
}
