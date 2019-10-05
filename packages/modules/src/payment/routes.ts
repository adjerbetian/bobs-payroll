import { Routes } from "@bobs-payroll/common";
import { Controllers } from "./controllers";

export function makeRoutes(controllers: Controllers): Routes {
    return {
        Payday: controllers.runPayroll
    };
}
