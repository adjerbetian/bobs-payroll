import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { CoreActions } from "./CoreActions";
import { buildCreateSalesReceipt } from "./createSalesReceipt";
import { buildCreateServiceCharge } from "./createServiceCharge";
import { buildCreateTimeCard } from "./createTimeCard";
import { buildCreateUnionMember } from "./createUnionMember";
import { buildCreateEmployee, buildDeleteEmployee, buildUpdateEmployee } from "./employees";
import { buildRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";
import { buildSetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

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
        deleteEmployee: buildDeleteEmployee({ employeeRepository }),
        createTimeCard: buildCreateTimeCard({ employeeRepository, timeCardRepository }),
        createServiceCharge: buildCreateServiceCharge({ serviceChargeRepository, unionMemberRepository }),
        createSalesReceipt: buildCreateSalesReceipt({ employeeRepository, salesReceiptRepository }),
        createEmployee: buildCreateEmployee({ employeeRepository }),
        updateEmployee: buildUpdateEmployee({ employeeRepository }),
        setEmployeePaymentMethod: buildSetEmployeePaymentMethod({ paymentMethodRepository }),
        createUnionMember: buildCreateUnionMember({ unionMemberRepository, employeeRepository }),
        removeEmployeeFromUnion: buildRemoveEmployeeFromUnion({ unionMemberRepository })
    };
}
