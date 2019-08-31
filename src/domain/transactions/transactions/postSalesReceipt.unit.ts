import { buildStubbedCoreActions, expect, generateSalesReceipt, Stub } from "@test/unit";
import * as moment from "moment";
import { CoreActions, SalesReceipt } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";

describe("postTimeCard", () => {
    let stubbedActions: Stub<CoreActions>;
    let postSalesReceipt: Transaction;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postSalesReceipt = buildPostSalesReceiptTransaction(stubbedActions);

        stubbedActions.createSalesReceipt.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generateSalesReceipt();

        await postSalesReceiptEntity(salesReceipt);

        expect(stubbedActions.createSalesReceipt).to.have.been.calledOnceWith(salesReceipt);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const salesReceipt = generateSalesReceipt();

        const promise = postSalesReceipt(`${salesReceipt.employeeId}`, `${salesReceipt.date}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "SalesReceipt");
    });
    it("should throw a TransactionFormatError if the date is not in the right format", async () => {
        const salesReceipt = generateSalesReceipt({ date: moment().format("DD-MM-YYYY") });

        const promise = postSalesReceipt(
            `${salesReceipt.employeeId}`,
            `${salesReceipt.date}`,
            `${salesReceipt.amount}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "SalesReceipt");
    });

    async function postSalesReceiptEntity(salesReceipt: SalesReceipt): Promise<void> {
        return postSalesReceipt(`${salesReceipt.employeeId}`, `${salesReceipt.date}`, `${salesReceipt.amount}`);
    }
});
