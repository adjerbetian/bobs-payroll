import { generators, expect, Stub } from "@test/unit";
import { RouteFormatError } from "../../../../router";
import {
    CommissionedEmployeeCreationModel,
    CoreUseCases,
    HourlyEmployeeCreationModel,
    SalariedEmployeeCreationModel
} from "../../domain";
import { buildStubbedCoreUseCases } from "../test";
import { makeAddEmployeeController } from "./addEmployee";

describe("addEmployee", () => {
    let stubbedUseCases: Stub<CoreUseCases>;
    let addEmployee: ReturnType<typeof makeAddEmployeeController>;

    beforeEach(() => {
        stubbedUseCases = buildStubbedCoreUseCases();
        addEmployee = makeAddEmployeeController(stubbedUseCases);

        stubbedUseCases.createEmployee.resolves();
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

        const requestModel: HourlyEmployeeCreationModel = {
            id: employee.getId(),
            address: employee.getAddress(),
            name: employee.getName(),
            type: employee.getType(),
            hourlyRate: employee.getHourlyRate()
        };
        expect(stubbedUseCases.createEmployee).to.have.been.calledOnceWith(requestModel);
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

        const requestModel: SalariedEmployeeCreationModel = {
            id: employee.getId(),
            address: employee.getAddress(),
            name: employee.getName(),
            type: employee.getType(),
            salary: employee.getSalary()
        };
        expect(stubbedUseCases.createEmployee).to.have.been.calledOnceWith(requestModel);
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

        const requestModel: CommissionedEmployeeCreationModel = {
            id: employee.getId(),
            address: employee.getAddress(),
            name: employee.getName(),
            type: employee.getType(),
            salary: employee.getSalary(),
            commissionRate: employee.getCommissionRate()
        };
        expect(stubbedUseCases.createEmployee).to.have.been.calledOnceWith(requestModel);
    });
    it("should throw when the transaction is malformed", async () => {
        const employee = generators.generateCommissionedEmployee();

        const promise = addEmployee(
            `${employee.getId()}`,
            `"${employee.getName()}"`,
            `"${employee.getAddress()}"`,
            "C",
            `${employee.getSalary()}`,
            ""
        );

        await expect(promise).to.be.rejectedWith(RouteFormatError, "AddEmp");
    });
});
