import {
    buildStubEmployeeRepository,
    buildStubSalesReceiptRepository,
    expect,
    generateCommissionedEmployee,
    generateSalariedEmployee,
    generateSalesReceipt,
    Stub
} from "@test/unit";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../repositories";
import { buildCreateSalesReceipt, CreateSalesReceipt } from "./createSalesReceipt";

describe("action createSalesReceipt", () => {
    let stubSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let createSalesReceipt: CreateSalesReceipt;

    beforeEach(() => {
        stubSalesReceiptRepository = buildStubSalesReceiptRepository();
        stubEmployeeRepository = buildStubEmployeeRepository();
        createSalesReceipt = buildCreateSalesReceipt({
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
