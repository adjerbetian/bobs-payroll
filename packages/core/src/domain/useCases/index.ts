import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMembershipRepository
} from "../repositories";
import { CoreUseCases } from "./CoreUseCases";
import { makeCoreEmployeeUseCases } from "./employees";
import { makeCorePaymentMethodUseCases } from "./paymentMethod";
import { makeCoreSalesReceiptUseCases } from "./salesReceipts";
import { makeCoreServiceChargesUseCases } from "./serviceCharges";
import { makeCoreTimeCardUseCases } from "./timeCards";
import { makeCoreUnionUseCases } from "./union";

export { CoreUseCases } from "./CoreUseCases";

export interface CoreUseCasesDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMembershipRepository: UnionMembershipRepository;
    salesReceiptRepository: SalesReceiptRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeCoreUseCases({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMembershipRepository,
    salesReceiptRepository,
    paymentMethodRepository
}: CoreUseCasesDependencies): CoreUseCases {
    return {
        ...makeCoreEmployeeUseCases({ employeeRepository }),
        ...makeCorePaymentMethodUseCases({ paymentMethodRepository }),
        ...makeCoreSalesReceiptUseCases({ employeeRepository, salesReceiptRepository }),
        ...makeCoreServiceChargesUseCases({ unionMembershipRepository, serviceChargeRepository }),
        ...makeCoreTimeCardUseCases({ employeeRepository, timeCardRepository }),
        ...makeCoreUnionUseCases({ employeeRepository, unionMembershipRepository })
    };
}
