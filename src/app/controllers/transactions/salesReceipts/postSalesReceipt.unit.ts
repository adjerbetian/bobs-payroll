import { generators, expect, Stub } from "@test/unit";
import * as moment from "moment";
import { CoreActions, SalesReceipt, SalesReceiptCreationModel } from "../../../domain";
import { TransactionFormatError } from "../../errors";
import { buildStubbedCoreActions } from "../../test";
import { makePostSalesReceiptTransaction } from "./postSalesReceipt";

describe("postTimeCard", () => {
    let stubbedActions: Stub<CoreActions>;
    let postSalesReceipt: ReturnType<typeof makePostSalesReceiptTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postSalesReceipt = makePostSalesReceiptTransaction(stubbedActions);

        stubbedActions.createSalesReceipt.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generators.generateSalesReceipt();

        await postSalesReceiptEntity(salesReceipt);

        const requestModel: SalesReceiptCreationModel = {
            employeeId: salesReceipt.getEmployeeId(),
            date: salesReceipt.getDate(),
            amount: salesReceipt.getAmount()
        };
        expect(stubbedActions.createSalesReceipt).to.have.been.calledOnceWith(requestModel);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const salesReceipt = generators.generateSalesReceipt();

        const promise = postSalesReceipt(`${salesReceipt.getEmployeeId()}`, `${salesReceipt.getDate()}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "SalesReceipt");
    });
    it("should throw a TransactionFormatError if the date is not in the right format", async () => {
        const salesReceipt = generators.generateSalesReceipt({ date: moment().format("DD-MM-YYYY") });

        const promise = postSalesReceipt(
            `${salesReceipt.getEmployeeId()}`,
            `${salesReceipt.getDate()}`,
            `${salesReceipt.getAmount()}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "SalesReceipt");
    });

    async function postSalesReceiptEntity(salesReceipt: SalesReceipt): Promise<void> {
        return postSalesReceipt(
            `${salesReceipt.getEmployeeId()}`,
            `${salesReceipt.getDate()}`,
            `${salesReceipt.getAmount()}`
        );
    }
});
