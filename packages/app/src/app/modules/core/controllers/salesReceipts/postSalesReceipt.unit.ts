import { RouteFormatError } from "@bobs-payroll/router";
import { generators, expect, Stub } from "../../../../../test/unit";
import * as moment from "moment";
import { CoreUseCases, SalesReceipt, SalesReceiptCreationModel } from "../../domain";
import { buildStubbedCoreUseCases } from "../test";
import { makePostSalesReceiptController } from "./postSalesReceipt";

describe("postTimeCard", () => {
    let stubbedUseCases: Stub<CoreUseCases>;
    let postSalesReceipt: ReturnType<typeof makePostSalesReceiptController>;

    beforeEach(() => {
        stubbedUseCases = buildStubbedCoreUseCases();
        postSalesReceipt = makePostSalesReceiptController(stubbedUseCases);

        stubbedUseCases.createSalesReceipt.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generators.generateSalesReceipt();

        await postSalesReceiptEntity(salesReceipt);

        const requestModel: SalesReceiptCreationModel = {
            employeeId: salesReceipt.getEmployeeId(),
            date: salesReceipt.getDate(),
            amount: salesReceipt.getAmount()
        };
        expect(stubbedUseCases.createSalesReceipt).to.have.been.calledOnceWith(requestModel);
    });
    it("should throw a RouteFormatError if the amount is missing", async () => {
        const salesReceipt = generators.generateSalesReceipt();

        const promise = postSalesReceipt(`${salesReceipt.getEmployeeId()}`, `${salesReceipt.getDate()}`, ``);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "SalesReceipt");
    });
    it("should throw a RouteFormatError if the date is not in the right format", async () => {
        const salesReceipt = generators.generateSalesReceipt({ date: moment().format("DD-MM-YYYY") });

        const promise = postSalesReceipt(
            `${salesReceipt.getEmployeeId()}`,
            `${salesReceipt.getDate()}`,
            `${salesReceipt.getAmount()}`
        );

        await expect(promise).to.be.rejectedWith(RouteFormatError, "SalesReceipt");
    });

    async function postSalesReceiptEntity(salesReceipt: SalesReceipt): Promise<void> {
        return postSalesReceipt(
            `${salesReceipt.getEmployeeId()}`,
            `${salesReceipt.getDate()}`,
            `${salesReceipt.getAmount()}`
        );
    }
});
