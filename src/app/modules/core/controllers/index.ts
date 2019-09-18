import { CoreActions } from "../domain";
import { Controllers } from "./Controllers";
import { makeAddEmployeeController, makeChangeEmployeeController, makeDeleteEmployeeController } from "./employees";
import { makePostSalesReceiptController } from "./salesReceipts";
import { makePostServiceChargeController } from "./serviceCharges";
import { makePostTimeCardController } from "./timeCards";

export { Controllers } from "./Controllers";

export function makeControllers(coreActions: CoreActions): Controllers {
    return {
        addEmployee: makeAddEmployeeController(coreActions),
        changeEmployee: makeChangeEmployeeController(coreActions),
        deleteEmployee: makeDeleteEmployeeController(coreActions),
        postSalesReceipt: makePostSalesReceiptController(coreActions),
        postServiceCharge: makePostServiceChargeController(coreActions),
        postTimeCard: makePostTimeCardController(coreActions)
    };
}
