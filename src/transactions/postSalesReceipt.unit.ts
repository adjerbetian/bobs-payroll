import { expect } from "../../test/unitTest";
import {
    generateCommissionedSalaryEmployee,
    generateMonthlySalaryEmployee,
    generateSalesReceipt
} from "../../test/generators";
import { Transaction } from "./Transactions";
import {
    buildFakeEmployeeRepository,
    buildFakeTimeCardRepository,
    FakeEmployeeRepository,
    FakeTimeCardRepository
} from "../../test/fakeBuilders";
import { EmployeeTypeError } from "../errors";
import { SalesReceipt } from "../entities";
import { TransactionFormatError } from "../errors/TransactionFormatError";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import * as moment from "moment";

describe("postTimeCard", () => {
    let fakeSalesReceiptRepository: FakeTimeCardRepository;
    let fakeEmployeeRepository: FakeEmployeeRepository;
    let postSalesReceipt: Transaction;

    beforeEach(() => {
        fakeSalesReceiptRepository = buildFakeTimeCardRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        postSalesReceipt = buildPostSalesReceiptTransaction({
            salesReceiptRepository: fakeSalesReceiptRepository,
            employeeRepository: fakeEmployeeRepository
        });

        fakeSalesReceiptRepository.insertOne.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generateSalesReceipt();
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(salesReceipt.employeeId)
            .resolves(generateCommissionedSalaryEmployee());

        await postSalesReceiptEntity(salesReceipt);

        expect(fakeSalesReceiptRepository.insertOne).to.have.been.calledOnceWith(salesReceipt);
    });
    it("should throw a EmployeeTypeError if the employee is not a commissioned employee", async () => {
        const salesReceipt = generateSalesReceipt();
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(salesReceipt.employeeId)
            .resolves(generateMonthlySalaryEmployee());

        // noinspection ES6MissingAwait
        const promise = postSalesReceiptEntity(salesReceipt);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const salesReceipt = generateSalesReceipt();
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(salesReceipt.employeeId)
            .resolves(generateCommissionedSalaryEmployee());

        // noinspection ES6MissingAwait
        const promise = postSalesReceipt(`${salesReceipt.employeeId}`, `${salesReceipt.date}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError);
    });
    it("should throw a TransactionFormatError if the date is not in the right format", async () => {
        const salesReceipt = generateSalesReceipt({ date: moment().format("DD-MM-YYYY") });
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(salesReceipt.employeeId)
            .resolves(generateCommissionedSalaryEmployee());

        // noinspection ES6MissingAwait
        const promise = postSalesReceipt(
            `${salesReceipt.employeeId}`,
            `${salesReceipt.date}`,
            `${salesReceipt.amount}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError);
    });

    async function postSalesReceiptEntity(salesReceipt: SalesReceipt): Promise<void> {
        return postSalesReceipt(
            `${salesReceipt.employeeId}`,
            `${salesReceipt.date}`,
            `${salesReceipt.amount}`
        );
    }
});
