export interface PaymentActions {
    runPayroll: (date: string) => Promise<void>;
}
