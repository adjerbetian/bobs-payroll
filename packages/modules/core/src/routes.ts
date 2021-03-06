import { Routes } from "@common/types";
import { Controllers } from "./controllers";

export function makeRoutes(controllers: Controllers): Routes {
    return {
        AddEmp: controllers.addEmployee,
        DelEmp: controllers.deleteEmployee,
        ChgEmp: controllers.changeEmployee,
        SalesReceipt: controllers.postSalesReceipt,
        ServiceCharge: controllers.postServiceCharge,
        TimeCard: controllers.postTimeCard
    };
}
