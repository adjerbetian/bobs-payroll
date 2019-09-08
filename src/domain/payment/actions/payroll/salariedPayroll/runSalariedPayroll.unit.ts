import { buildStubbedCoreActions, buildStubFor, entityGenerators, expect, lastDayOfMonth, Stub } from "@test/unit";
import { CoreActions } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { makeRunSalariedPayroll } from "./runSalariedPayroll";

describe("action runSalariedPayroll", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runSalariedPayroll: ReturnType<typeof makeRunSalariedPayroll>;

    beforeEach(() => {
        stubbedCoreActions = buildStubbedCoreActions();
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runSalariedPayroll = makeRunSalariedPayroll({
            coreActions: stubbedCoreActions,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = entityGenerators.generateSalariedEmployee();
        stubbedCoreActions.fetchAllSalariedEmployees.resolves([employee]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.getId(),
            date: lastDayOfMonth,
            amount: employee.getSalary()
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [entityGenerators.generateSalariedEmployee(), entityGenerators.generateSalariedEmployee()];
        stubbedCoreActions.fetchAllSalariedEmployees.resolves(employees);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
