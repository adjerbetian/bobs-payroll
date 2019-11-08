import { lastDayOfMonth } from "@common/dates";
import { CoreUseCases } from "@modules/core";
import { buildStubFor, expect, Stub } from "@infra/test";
import { buildStubbedCoreUseCases, generators } from "../../../../test";
import { CreatePaymentForEmployee } from "../../payment";
import { makeRunSalariedPayroll } from "./runSalariedPayroll";

describe("use case - runSalariedPayroll", () => {
    let stubbedCoreUseCases: Stub<CoreUseCases>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runSalariedPayroll: ReturnType<typeof makeRunSalariedPayroll>;

    beforeEach(() => {
        stubbedCoreUseCases = buildStubbedCoreUseCases();
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runSalariedPayroll = makeRunSalariedPayroll({
            coreUseCases: stubbedCoreUseCases,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generators.generateSalariedEmployee();
        stubbedCoreUseCases.fetchAllSalariedEmployees.resolves([employee]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.getId(),
            date: lastDayOfMonth,
            amount: employee.getSalary()
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generators.generateSalariedEmployee(), generators.generateSalariedEmployee()];
        stubbedCoreUseCases.fetchAllSalariedEmployees.resolves(employees);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
