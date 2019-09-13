import { buildSalesReceipt, SalesReceipt } from "../../domain";
import { SalesReceiptDBModel } from "../DBModels";
import { buildMapper, Mapper } from "./mapper";

type SalesReceiptMapper = Mapper<SalesReceiptDBModel, SalesReceipt>;

export const salesReceiptMapper: SalesReceiptMapper = buildMapper({
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
