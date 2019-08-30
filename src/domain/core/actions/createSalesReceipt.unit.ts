import { buildStubEmployeeRepository, buildStubTimeCardRepository, Stub } from "../../../../test/stubBuilders";
import {
    generateCommissionedEmployee,
    generateSalariedEmployee,
    generateSalesReceipt
} from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { buildCreateSalesReceiptAction, CreateSalesReceiptAction } from "./createSalesReceipt";

describe("action createTimeCard", () => {
    let stubSalesReceiptRepository: Stub<TimeCardRepository>;
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let createSalesReceipt: CreateSalesReceiptAction;

    beforeEach(() => {
        stubSalesReceiptRepository = buildStubTimeCardRepository();
        stubEmployeeRepository = buildStubEmployeeRepository();
        createSalesReceipt = buildCreateSalesReceiptAction({
            salesReceiptRepository: stubSalesReceiptRepository,
            employeeRepository: stubEmployeeRepository
        });

        stubSalesReceiptRepository.insert.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generateSalesReceipt();
        stubEmployeeRepository.fetchById.withArgs(salesReceipt.employeeId).resolves(generateCommissionedEmployee());

        await createSalesReceipt(salesReceipt);

        expect(stubSalesReceiptRepository.insert).to.have.been.calledOnceWith(salesReceipt);
    });
    it("should throw a EmployeeTypeError if the employee is not a commissioned employee", async () => {
        const salesReceipt = generateSalesReceipt();
        stubEmployeeRepository.fetchById.withArgs(salesReceipt.employeeId).resolves(generateSalariedEmployee());

        const promise = createSalesReceipt(salesReceipt);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
