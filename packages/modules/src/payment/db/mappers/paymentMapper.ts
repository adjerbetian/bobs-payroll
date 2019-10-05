import { buildMapper } from "@bobs-payroll/mongo";
import {
    buildDirectPaymentMethod,
    buildHoldPaymentMethod,
    buildMailPaymentMethod,
    InvalidObject,
    PaymentMethod,
    PaymentMethodType
} from "../../../core";
import { buildPayment, Payment } from "../../domain";
import { PaymentDBModel } from "../DBModels";

export const paymentMapper = buildMapper<Payment, PaymentDBModel>({
    toEntity({ employeeId, amount, date, method }) {
        return buildPayment({
            employeeId,
            date,
            amount,
            method: buildPaymentMethod()
        });

        function buildPaymentMethod(): PaymentMethod {
            if (method.type === PaymentMethodType.HOLD) {
                return buildHoldPaymentMethod({ employeeId });
            }
            if (method.type === PaymentMethodType.DIRECT) {
                return buildDirectPaymentMethod({
                    employeeId,
                    account: method.account,
                    bank: method.bank
                });
            }
            if (method.type === PaymentMethodType.MAIL) {
                return buildMailPaymentMethod({
                    employeeId,
                    address: method.address
                });
            }
            throw new InvalidObject(method);
        }
    },
    toDBModel(payment) {
        return {
            employeeId: payment.getEmployeeId(),
            amount: payment.getAmount(),
            date: payment.getDate(),
            method: buildMethodDBModel(payment.getMethod())
        };

        function buildMethodDBModel(method: PaymentMethod): PaymentDBModel["method"] {
            if (method.hasType(PaymentMethodType.HOLD)) {
                return { type: method.getType() };
            }
            if (method.hasType(PaymentMethodType.DIRECT)) {
                return {
                    type: method.getType(),
                    bank: method.getBank(),
                    account: method.getAccount()
                };
            }
            if (method.hasType(PaymentMethodType.MAIL)) {
                return {
                    type: method.getType(),
                    address: method.getAddress()
                };
            }
            throw new InvalidObject(method);
        }
    }
});
