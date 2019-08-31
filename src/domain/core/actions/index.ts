import {
    EmployeeRepository,
    PaymentMethodRepository,
    PaymentRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { buildCreateSalesReceipt, CreateSalesReceipt } from "./createSalesReceipt";
import { buildCreateServiceCharge, CreateServiceCharge } from "./createServiceCharge";
import { buildCreateTimeCard, CreateTimeCard } from "./createTimeCard";
import { buildCreateUnionMember, CreateUnionMember } from "./createUnionMember";
import {
    buildCreateEmployee,
    buildDeleteEmployee,
    buildUpdateEmployee,
    CreateEmployee,
    DeleteEmployee,
    UpdateEmployee
} from "./employees";
import { buildRunPayroll, RunPayroll } from "./payroll";
import { buildRemoveEmployeeFromUnion, RemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";
import { buildSetEmployeePaymentMethod, SetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

export interface Actions {
    deleteEmployee: DeleteEmployee;
    createTimeCard: CreateTimeCard;
    createServiceCharge: CreateServiceCharge;
    createSalesReceipt: CreateSalesReceipt;
    createEmployee: CreateEmployee;
    updateEmployee: UpdateEmployee;
    setEmployeePaymentMethod: SetEmployeePaymentMethod;
    createUnionMember: CreateUnionMember;
    removeEmployeeFromUnion: RemoveEmployeeFromUnion;
    runPayroll: RunPayroll;
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
    salesReceiptRepository: SalesReceiptRepository;
    paymentMethodRepository: PaymentMethodRepository;
    paymentRepository: PaymentRepository;
}

export function buildActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository,
    salesReceiptRepository,
    paymentMethodRepository,
    paymentRepository
}: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployee({ employeeRepository }),
        createTimeCard: buildCreateTimeCard({ employeeRepository, timeCardRepository }),
        createServiceCharge: buildCreateServiceCharge({ serviceChargeRepository, unionMemberRepository }),
        createSalesReceipt: buildCreateSalesReceipt({ employeeRepository, salesReceiptRepository }),
        createEmployee: buildCreateEmployee({ employeeRepository }),
        updateEmployee: buildUpdateEmployee({ employeeRepository }),
        setEmployeePaymentMethod: buildSetEmployeePaymentMethod({ paymentMethodRepository }),
        createUnionMember: buildCreateUnionMember({ unionMemberRepository, employeeRepository }),
        removeEmployeeFromUnion: buildRemoveEmployeeFromUnion({ unionMemberRepository }),
        runPayroll: buildRunPayroll({
            paymentRepository,
            timeCardRepository,
            paymentMethodRepository,
            employeeRepository,
            salesReceiptRepository
        })
    };
}
