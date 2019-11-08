import { Routes } from "@common/types";
import { Controllers } from "./controllers";

export function makeRoutes(controllers: Controllers): Routes {
    return {
        Payday: controllers.runPayroll
    };
}
