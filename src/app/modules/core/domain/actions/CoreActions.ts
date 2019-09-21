import {
    CommissionedEmployee,
    HourlyEmployee,
    PaymentMethod,
    SalariedEmployee,
    SalesReceipt,
    TimeCard
} from "../entities";
import {
    EmployeeCreationModel,
    EmployeeUpdateModel,
    PaymentMethodCreationModel,
    SalesReceiptCreationModel,
    ServiceChargeCreationModel,
    TimeCardCreationModel,
    UnionMemberCreationModel
} from "../requestModels";

// prettier-ignore
export type CoreActions =
    & CoreEmployeeActions
    & CorePaymentMethodActions
    & CoreSalesReceiptActions
    & CoreServiceChargeActions
    & CoreTimeCardActions
    & CoreUnionActions;

export interface CoreEmployeeActions {
    createEmployee(creationModel: EmployeeCreationModel): Promise<void>;
    fetchAllHourlyEmployees(): Promise<HourlyEmployee[]>;
    fetchAllSalariedEmployees(): Promise<SalariedEmployee[]>;
    fetchAllCommissionedEmployees(): Promise<CommissionedEmployee[]>;
    updateEmployee(employeeId: number, update: EmployeeUpdateModel): Promise<void>;
    deleteEmployee(employeeId: number): Promise<void>;
}

export interface CorePaymentMethodActions {
    fetchEmployeePaymentMethod(employeeId: number): Promise<PaymentMethod>;
    createPaymentMethod(creationModel: PaymentMethodCreationModel): Promise<void>;
}

export interface CoreSalesReceiptActions {
    createSalesReceipt(creationModel: SalesReceiptCreationModel): Promise<void>;
    fetchAllEmployeeSalesReceiptsSince(employeeId: number, date: string): Promise<SalesReceipt[]>;
}

export interface CoreServiceChargeActions {
    createServiceCharge(creationModel: ServiceChargeCreationModel): Promise<void>;
}

export interface CoreTimeCardActions {
    createTimeCard(creationModel: TimeCardCreationModel): Promise<void>;
    fetchEmployeeTimeCardsSince(employeeId: number, date: string): Promise<TimeCard[]>;
}

export interface CoreUnionActions {
    createUnionMember(creationModel: UnionMemberCreationModel): Promise<void>;
    removeEmployeeFromUnion(employeeId: number): Promise<void>;
}
