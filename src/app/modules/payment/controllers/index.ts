import { PaymentActions } from "../domain";
import { Controllers } from "./Controllers";
import { makeRunPayrollController } from "./transactions";

export { Controllers } from "./Controllers";

export function makeControllers(paymentActions: PaymentActions): Controllers {
    return {
        runPayroll: makeRunPayrollController(paymentActions)
    };
}
