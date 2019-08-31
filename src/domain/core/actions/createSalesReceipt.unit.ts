import {
    buildStubbedEmployeeRepository,
    buildStubbedSalesReceiptRepository,
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
    let stubbedSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createSalesReceipt: CreateSalesReceipt;

    beforeEach(() => {
        stubbedSalesReceiptRepository = buildStubbedSalesReceiptRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createSalesReceipt = buildCreateSalesReceipt({
            salesReceiptRepository: stubbedSalesReceiptRepository,
            employeeRepository: stubbedEmployeeRepository
        });

        stubbedSalesReceiptRepository.insert.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generateSalesReceipt();
        stubbedEmployeeRepository.fetchById.withArgs(salesReceipt.employeeId).resolves(generateCommissionedEmployee());

        await createSalesReceipt(salesReceipt);

        expect(stubbedSalesReceiptRepository.insert).to.have.been.calledOnceWith(salesReceipt);
    });
    it("should throw a EmployeeTypeError if the employee is not a commissioned employee", async () => {
        const salesReceipt = generateSalesReceipt();
        stubbedEmployeeRepository.fetchById.withArgs(salesReceipt.employeeId).resolves(generateSalariedEmployee());

        const promise = createSalesReceipt(salesReceipt);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
