import { generators, expect, Stub } from "@test/unit";
import { CoreActions } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { buildStubbedCoreActions } from "../../test";
import { makeAddEmployeeTransaction } from "./addEmployee";

describe("addEmployee", () => {
    let stubbedActions: Stub<CoreActions>;
    let addEmployee: ReturnType<typeof makeAddEmployeeTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        addEmployee = makeAddEmployeeTransaction(stubbedActions);

        stubbedActions.createEmployee.resolves();
    });

    it("should insert an hourly employee", async () => {
        const employee = generators.generateHourlyEmployee();

        await addEmployee(
            `${employee.getId()}`,
            `"${employee.getName()}"`,
            `"${employee.getAddress()}"`,
            "H",
            `${employee.getHourlyRate()}`
        );

        expect(stubbedActions.createEmployee).to.have.been.calledOnceWithEntity(employee);
    });
    it("should insert a salaried employee", async () => {
        const employee = generators.generateSalariedEmployee();

        await addEmployee(
            `${employee.getId()}`,
            `"${employee.getName()}"`,
            `"${employee.getAddress()}"`,
            "S",
            `${employee.getSalary()}`
        );

        expect(stubbedActions.createEmployee).to.have.been.calledOnceWithEntity(employee);
    });
    it("should insert an salaried with commission employee", async () => {
        const employee = generators.generateCommissionedEmployee();

        await addEmployee(
            `${employee.getId()}`,
            `"${employee.getName()}"`,
            `"${employee.getAddress()}"`,
            "C",
            `${employee.getSalary()}`,
            `${employee.getCommissionRate()}`
        );

        expect(stubbedActions.createEmployee).to.have.been.calledOnceWithEntity(employee);
    });
    it("should throw when the transaction is malformed", async () => {
        const employee = generators.generateCommissionedEmployee();

        const promise = addEmployee(
            `${employee.getId()}`,
            `"${employee.getName()}"`,
            `"${employee.getAddress()}"`,
            "C",
            `${employee.getSalary()}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "AddEmp");
    });
});
