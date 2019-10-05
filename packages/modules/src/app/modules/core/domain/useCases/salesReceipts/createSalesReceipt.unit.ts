import { generators, expect, Stub } from "../../../../../../test/unit";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { buildStubbedEmployeeRepository, buildStubbedSalesReceiptRepository } from "../../test";
import { makeCreateSalesReceipt } from "./createSalesReceipt";

describe("use case - createSalesReceipt", () => {
    let stubbedSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createSalesReceipt: ReturnType<typeof makeCreateSalesReceipt>;

    beforeEach(() => {
        stubbedSalesReceiptRepository = buildStubbedSalesReceiptRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createSalesReceipt = makeCreateSalesReceipt({
            salesReceiptRepository: stubbedSalesReceiptRepository,
            employeeRepository: stubbedEmployeeRepository
        });

        stubbedSalesReceiptRepository.insert.resolves();
    });

    it("should create a sales receipt for the employee", async () => {
        const salesReceipt = generators.generateSalesReceipt();
        stubbedEmployeeRepository.fetchById
            .withArgs(salesReceipt.getEmployeeId())
            .resolves(generators.generateCommissionedEmployee());

        await createSalesReceipt({
            employeeId: salesReceipt.getEmployeeId(),
            amount: salesReceipt.getAmount(),
            date: salesReceipt.getDate()
        });

        expect(stubbedSalesReceiptRepository.insert).to.have.been.calledOnceWithEntity(salesReceipt);
    });
    it("should throw a EmployeeTypeError if the employee is not a commissioned employee", async () => {
        const salesReceipt = generators.generateSalesReceipt();
        stubbedEmployeeRepository.fetchById
            .withArgs(salesReceipt.getEmployeeId())
            .resolves(generators.generateSalariedEmployee());

        const promise = createSalesReceipt({
            employeeId: salesReceipt.getEmployeeId(),
            amount: salesReceipt.getAmount(),
            date: salesReceipt.getDate()
        });

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
