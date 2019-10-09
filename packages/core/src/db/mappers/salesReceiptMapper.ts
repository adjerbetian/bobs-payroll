import { buildMapper } from "@payroll/mongo";
import { buildSalesReceipt, SalesReceipt } from "../../domain";
import { SalesReceiptDBModel } from "../DBModels";

export const salesReceiptMapper = buildMapper<SalesReceipt, SalesReceiptDBModel>({
    toEntity(model) {
        return buildSalesReceipt({
            employeeId: model.employeeId,
            amount: model.amount,
            date: model.date
        });
    },
    toDBModel(entity) {
        return {
            employeeId: entity.getEmployeeId(),
            amount: entity.getAmount(),
            date: entity.getDate()
        };
    }
});
