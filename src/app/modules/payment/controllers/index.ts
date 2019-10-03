import { PaymentUseCases } from "../domain";
import { Controllers } from "./Controllers";
import { makeRunPayrollController } from "./transactions";

export { Controllers } from "./Controllers";

export function makeControllers(paymentUseCases: PaymentUseCases): Controllers {
    return {
        runPayroll: makeRunPayrollController(paymentUseCases)
    };
}
