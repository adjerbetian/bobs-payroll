import {
    CommissionedEmployee,
    DirectPaymentMethod,
    Employee,
    HoldPaymentMethod,
    HourlyEmployee,
    MailPaymentMethod,
    Payment,
    PaymentMethod,
    SalariedEmployee,
    SalesReceipt,
    ServiceCharge,
    TimeCard,
    UnionMember
} from "../../domain";
import {
    CommissionedEmployeeDBModel,
    DirectPaymentMethodDBModel,
    EmployeeDBModel,
    HoldPaymentMethodDBModel,
    HourlyEmployeeDBModel,
    MailPaymentMethodDBModel,
    PaymentDBModel,
    PaymentMethodDBModel,
    SalariedEmployeeDBModel,
    SalesReceiptDBModel,
    ServiceChargeDBModel,
    TimeCardDBModel,
    UnionMemberDBModel
} from "../DBModels";

export interface Mapper<Entity, DBModel = EntityModel<Entity>> {
    toEntity(model: DBModel): Entity;
    toEntities(models: DBModel[]): Entity[];
    toDBModel(entity: Entity): DBModel;
}

// prettier-ignore
export type EntityModel<Entity> =
    Entity extends HourlyEmployee ? HourlyEmployeeDBModel :
    Entity extends SalariedEmployee ? SalariedEmployeeDBModel :
    Entity extends CommissionedEmployee ? CommissionedEmployeeDBModel :
    Entity extends Employee ? EmployeeDBModel :

    Entity extends HoldPaymentMethod ? HoldPaymentMethodDBModel :
    Entity extends DirectPaymentMethod ? DirectPaymentMethodDBModel :
    Entity extends MailPaymentMethod ? MailPaymentMethodDBModel :
    Entity extends PaymentMethod ? PaymentMethodDBModel :

    Entity extends Payment ? PaymentDBModel :
    Entity extends SalesReceipt ? SalesReceiptDBModel :
    Entity extends ServiceCharge ? ServiceChargeDBModel :
    Entity extends TimeCard ? TimeCardDBModel :
    Entity extends UnionMember ? UnionMemberDBModel :
    never

export function buildMapper<Entity, DBModel = EntityModel<Entity>>(
    basicMapper: Omit<Mapper<Entity, DBModel>, "toEntities">
): Mapper<Entity, DBModel> {
    return {
        ...basicMapper,
        toEntities(models) {
            return models.map(model => basicMapper.toEntity(model));
        }
    };
}
