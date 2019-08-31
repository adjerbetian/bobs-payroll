import { buildStubbedEmployeeRepository, expect, generateHourlyEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildCreateEmployee, CreateEmployee } from "./createEmployee";

describe("action createEmployee", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createEmployee: CreateEmployee;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createEmployee = buildCreateEmployee({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should insert the given employee", async () => {
        const employee = generateHourlyEmployee();
        stubbedEmployeeRepository.insert.resolves();

        await createEmployee(employee);

        expect(stubbedEmployeeRepository.insert).to.have.been.calledOnceWith(employee);
    });
});
