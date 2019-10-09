import { expect, Stub } from "@payroll/test";
import { generators } from "../../../test";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeCreateEmployee } from "./createEmployee";

describe("use case - createEmployee", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createEmployee: ReturnType<typeof makeCreateEmployee>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createEmployee = makeCreateEmployee({ employeeRepository: stubbedEmployeeRepository });

        stubbedEmployeeRepository.insert.resolves();
    });

    it("should insert the given hourly employee", async () => {
        const employee = generators.generateHourlyEmployee();

        await createEmployee({
            id: employee.getId(),
            name: employee.getName(),
            address: employee.getAddress(),
            type: employee.getType(),
            hourlyRate: employee.getHourlyRate()
        });

        expect(stubbedEmployeeRepository.insert).to.have.been.calledOnceWithEntity(employee);
    });
    it("should insert the given salaried employee", async () => {
        const employee = generators.generateSalariedEmployee();

        await createEmployee({
            id: employee.getId(),
            name: employee.getName(),
            address: employee.getAddress(),
            type: employee.getType(),
            salary: employee.getSalary()
        });

        expect(stubbedEmployeeRepository.insert).to.have.been.calledOnceWithEntity(employee);
    });
    it("should insert the given commissioned employee", async () => {
        const employee = generators.generateCommissionedEmployee();

        await createEmployee({
            id: employee.getId(),
            name: employee.getName(),
            address: employee.getAddress(),
            type: employee.getType(),
            salary: employee.getSalary(),
            commissionRate: employee.getCommissionRate()
        });

        expect(stubbedEmployeeRepository.insert).to.have.been.calledOnceWithEntity(employee);
    });
});
