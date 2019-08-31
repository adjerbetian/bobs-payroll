import { buildStubEmployeeRepository, expect, generateHourlyEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildCreateEmployee, CreateEmployee } from "./createEmployee";

describe("action createEmployee", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let createEmployee: CreateEmployee;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        createEmployee = buildCreateEmployee({ employeeRepository: stubEmployeeRepository });
    });

    it("should insert the given employee", async () => {
        const employee = generateHourlyEmployee();
        stubEmployeeRepository.insert.resolves();

        await createEmployee(employee);

        expect(stubEmployeeRepository.insert).to.have.been.calledOnceWith(employee);
    });
});
