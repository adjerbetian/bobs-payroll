export interface PaymentUseCases {
    runPayroll: (date: string) => Promise<void>;
}
