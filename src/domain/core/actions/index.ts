import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { CoreActions } from "./CoreActions";
import { buildCoreEmployeeActions } from "./employees";
import { buildCorePaymentMethodActions } from "./paymentMethod";
import { buildCoreSalesReceiptActions } from "./salesReceipts";
import { buildCoreServiceChargesActions } from "./serviceCharges";
import { buildCoreTimeCardActions } from "./timeCards";
import { buildCoreUnionActions } from "./union";

export { CoreActions } from "./CoreActions";

export interface CoreActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
    salesReceiptRepository: SalesReceiptRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCoreActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository,
    salesReceiptRepository,
    paymentMethodRepository
}: CoreActionsDependencies): CoreActions {
    return {
        ...buildCoreEmployeeActions({ employeeRepository }),
        ...buildCorePaymentMethodActions({ paymentMethodRepository }),
        ...buildCoreSalesReceiptActions({ employeeRepository, salesReceiptRepository }),
        ...buildCoreServiceChargesActions({ unionMemberRepository, serviceChargeRepository }),
        ...buildCoreTimeCardActions({ employeeRepository, timeCardRepository }),
        ...buildCoreUnionActions({ employeeRepository, unionMemberRepository })
    };
}
