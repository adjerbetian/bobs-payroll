import {
    CommissionedEmployee,
    Employee,
    HourlyEmployee,
    PaymentMethod,
    SalariedEmployee,
    SalesReceipt,
    ServiceCharge,
    TimeCard,
    UnionMember
} from "../entities";

export type CoreActions = CoreEmployeeActions &
    CorePaymentMethodActions &
    CoreSalesReceiptActions &
    CoreServiceChargeActions &
    CoreTimeCardActions &
    CoreUnionActions;

export interface CoreEmployeeActions {
    createEmployee: (employee: Employee) => Promise<void>;
    fetchAllHourly: () => Promise<HourlyEmployee[]>;
    fetchAllSalaried: () => Promise<SalariedEmployee[]>;
    fetchAllCommissioned: () => Promise<CommissionedEmployee[]>;
    updateEmployee: (employeeId: number, update: Partial<Employee>) => Promise<void>;
    deleteEmployee: (employeeId: number) => Promise<void>;
}

export interface CorePaymentMethodActions {
    setEmployeePaymentMethod: (paymentMethod: PaymentMethod) => Promise<void>;
}

export interface CoreSalesReceiptActions {
    createSalesReceipt: (salesReceipt: SalesReceipt) => Promise<void>;
}

export interface CoreServiceChargeActions {
    createServiceCharge: (serviceCharge: ServiceCharge) => Promise<void>;
}

export interface CoreTimeCardActions {
    createTimeCard: (timeCard: TimeCard) => Promise<void>;
}

export interface CoreUnionActions {
    createUnionMember: (unionMember: UnionMember) => Promise<void>;
    removeEmployeeFromUnion: (employeeId: number) => Promise<void>;
}
