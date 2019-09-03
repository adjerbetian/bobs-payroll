import {
    buildStubbedCoreActions,
    expect,
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateSalariedEmployee,
    Stub
} from "@test/unit";
import { CoreActions } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { buildAddEmployeeTransaction } from "./addEmployee";

describe("addEmployee", () => {
    let stubbedActions: Stub<CoreActions>;
    let addEmployee: ReturnType<typeof buildAddEmployeeTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        addEmployee = buildAddEmployeeTransaction(stubbedActions);

        stubbedActions.createEmployee.resolves();
    });

    it("should insert an hourly employee", async () => {
        const employee = generateHourlyEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "H",
            `${employee.work.hourlyRate}`
        );

        expect(stubbedActions.createEmployee).to.have.been.calledOnceWith(employee);
    });
    it("should insert a salaried employee", async () => {
        const employee = generateSalariedEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "S",
            `${employee.work.monthlySalary}`
        );

        expect(stubbedActions.createEmployee).to.have.been.calledOnceWith(employee);
    });
    it("should insert an salaried with commission employee", async () => {
        const employee = generateCommissionedEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "C",
            `${employee.work.monthlySalary}`,
            `${employee.work.commissionRate}`
        );

        expect(stubbedActions.createEmployee).to.have.been.calledOnceWith(employee);
    });
    it("should throw when the transaction is malformed", async () => {
        const employee = generateCommissionedEmployee();

        const promise = addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "C",
            `${employee.work.monthlySalary}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "AddEmp");
    });
});
