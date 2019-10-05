import { CoreUseCases } from "../domain";
import { Controllers } from "./Controllers";
import { makeAddEmployeeController, makeChangeEmployeeController, makeDeleteEmployeeController } from "./employees";
import { makePostSalesReceiptController } from "./salesReceipts";
import { makePostServiceChargeController } from "./serviceCharges";
import { makePostTimeCardController } from "./timeCards";

export { Controllers } from "./Controllers";

export function makeControllers(coreUseCases: CoreUseCases): Controllers {
    return {
        addEmployee: makeAddEmployeeController(coreUseCases),
        changeEmployee: makeChangeEmployeeController(coreUseCases),
        deleteEmployee: makeDeleteEmployeeController(coreUseCases),
        postSalesReceipt: makePostSalesReceiptController(coreUseCases),
        postServiceCharge: makePostServiceChargeController(coreUseCases),
        postTimeCard: makePostTimeCardController(coreUseCases)
    };
}
