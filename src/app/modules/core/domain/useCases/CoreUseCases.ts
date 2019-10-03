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
export type CoreUseCases =
    & CoreEmployeeUseCases
    & CorePaymentMethodUseCases
    & CoreSalesReceiptUseCases
    & CoreServiceChargeUseCases
    & CoreTimeCardUseCases
    & CoreUnionUseCases;

export interface CoreEmployeeUseCases {
    createEmployee(creationModel: EmployeeCreationModel): Promise<void>;
    fetchAllHourlyEmployees(): Promise<HourlyEmployee[]>;
    fetchAllSalariedEmployees(): Promise<SalariedEmployee[]>;
    fetchAllCommissionedEmployees(): Promise<CommissionedEmployee[]>;
    updateEmployee(employeeId: number, update: EmployeeUpdateModel): Promise<void>;
    deleteEmployee(employeeId: number): Promise<void>;
}

export interface CorePaymentMethodUseCases {
    fetchEmployeePaymentMethod(employeeId: number): Promise<PaymentMethod>;
    createPaymentMethod(creationModel: PaymentMethodCreationModel): Promise<void>;
}

export interface CoreSalesReceiptUseCases {
    createSalesReceipt(creationModel: SalesReceiptCreationModel): Promise<void>;
    fetchAllEmployeeSalesReceiptsSince(employeeId: number, date: string): Promise<SalesReceipt[]>;
}

export interface CoreServiceChargeUseCases {
    createServiceCharge(creationModel: ServiceChargeCreationModel): Promise<void>;
}

export interface CoreTimeCardUseCases {
    createTimeCard(creationModel: TimeCardCreationModel): Promise<void>;
    fetchEmployeeTimeCardsSince(employeeId: number, date: string): Promise<TimeCard[]>;
}

export interface CoreUnionUseCases {
    createUnionMember(creationModel: UnionMemberCreationModel): Promise<void>;
    removeEmployeeFromUnion(employeeId: number): Promise<void>;
}
