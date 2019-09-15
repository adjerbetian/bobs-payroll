import { buildSalesReceipt, SalesReceipt } from "../../domain";
import { buildMapper } from "./mapper";

export const salesReceiptMapper = buildMapper<SalesReceipt>({
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
