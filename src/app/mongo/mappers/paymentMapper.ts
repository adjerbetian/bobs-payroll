import { buildPayment, Payment } from "../../domain";
import { PaymentDBModel } from "../DBModels";
import { buildMapper } from "./mapper";
import { paymentMethodMapper } from "./paymentMethodMapper";

export const paymentMapper = buildMapper<Payment, PaymentDBModel>({
    toEntity({ employeeId, amount, date, method }) {
        return buildPayment({
            employeeId,
            date,
            amount,
            method: paymentMethodMapper.toEntity(method)
        });
    },
    toDBModel(payment) {
        return {
            employeeId: payment.getEmployeeId(),
            amount: payment.getAmount(),
            date: payment.getDate(),
            method: paymentMethodMapper.toDBModel(payment.getMethod())
        };
    }
});
