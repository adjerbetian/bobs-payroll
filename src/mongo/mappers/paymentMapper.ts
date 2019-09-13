import { buildPayment, Payment } from "../../domain";
import { PaymentDBModel } from "../DBModels";
import { buildMapper, Mapper } from "./mapper";
import { paymentMethodMapper } from "./paymentMethodMapper";

type PaymentMapper = Mapper<PaymentDBModel, Payment>;

export const paymentMapper: PaymentMapper = buildMapper({
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
});
