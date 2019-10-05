import { Routes } from "@bobs-payroll/router";
import { Controllers } from "./controllers";

export function makeRoutes(controllers: Controllers): Routes {
    return {
        Payday: controllers.runPayroll
    };
}
