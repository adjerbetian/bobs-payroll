import { buildPayment, Payment } from "../../domain";
import { PaymentMethodDBModel, paymentMethodMapper } from "./PaymentMethodDBModel";

export interface PaymentDBModel {
    employeeId: number;
    amount: number;
    date: string;
    method: PaymentMethodDBModel;
}

interface PaymentMapper {
    toEntity(model: PaymentDBModel): Payment;
    toDBModel(entity: Payment): PaymentDBModel;
}

export const paymentMapper: PaymentMapper = {
    toEntity({ employeeId, amount, date, method }: PaymentDBModel): Payment {
        return buildPayment({
            employeeId,
            date,
            amount,
            method: paymentMethodMapper.toEntity(method)
        });
    },
    toDBModel(payment: Payment): PaymentDBModel {
        return {
            employeeId: payment.getEmployeeId(),
            amount: payment.getAmount(),
            date: payment.getDate(),
            method: paymentMethodMapper.toDBModel(payment.getMethod())
        };
    }
};
