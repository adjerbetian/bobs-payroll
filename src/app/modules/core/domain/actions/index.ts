import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { CoreActions } from "./CoreActions";
import { makeCoreEmployeeActions } from "./employees";
import { makeCorePaymentMethodActions } from "./paymentMethod";
import { makeCoreSalesReceiptActions } from "./salesReceipts";
import { makeCoreServiceChargesActions } from "./serviceCharges";
import { makeCoreTimeCardActions } from "./timeCards";
import { makeCoreUnionActions } from "./union";

export { CoreActions } from "./CoreActions";

export interface CoreActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
    salesReceiptRepository: SalesReceiptRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeCoreActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository,
    salesReceiptRepository,
    paymentMethodRepository
}: CoreActionsDependencies): CoreActions {
    return {
        ...makeCoreEmployeeActions({ employeeRepository }),
        ...makeCorePaymentMethodActions({ paymentMethodRepository }),
        ...makeCoreSalesReceiptActions({ employeeRepository, salesReceiptRepository }),
        ...makeCoreServiceChargesActions({ unionMemberRepository, serviceChargeRepository }),
        ...makeCoreTimeCardActions({ employeeRepository, timeCardRepository }),
        ...makeCoreUnionActions({ employeeRepository, unionMemberRepository })
    };
}
