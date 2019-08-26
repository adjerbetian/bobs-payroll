import { buildFakeEmployeeRepository, buildFakeTimeCardRepository, Fake } from "../../../../test/fakeBuilders";
import {
    generateCommissionedEmployee,
    generateSalariedEmployee,
    generateSalesReceipt
} from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { buildCreateSalesReceiptAction, CreateSalesReceiptAction } from "./createSalesReceipt";

describe("postTimeCard", () => {
    let fakeSalesReceiptRepository: Fake<TimeCardRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let createSalesReceipt: CreateSalesReceiptAction;

    beforeEach(() => {
        fakeSalesReceiptRepository = buildFakeTimeCardRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        createSalesReceipt = buildCreateSalesReceiptAction({
            salesReceiptRepository: fakeSalesReceiptRepository,
            employeeRepository: fakeEmployeeRepository
        });

        fakeSalesReceiptRepository.insert.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generateSalesReceipt();
        fakeEmployeeRepository.fetchById.withArgs(salesReceipt.employeeId).resolves(generateCommissionedEmployee());

        await createSalesReceipt(salesReceipt);

        expect(fakeSalesReceiptRepository.insert).to.have.been.calledOnceWith(salesReceipt);
    });
    it("should throw a EmployeeTypeError if the employee is not a commissioned employee", async () => {
        const salesReceipt = generateSalesReceipt();
        fakeEmployeeRepository.fetchById.withArgs(salesReceipt.employeeId).resolves(generateSalariedEmployee());

        const promise = createSalesReceipt(salesReceipt);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
