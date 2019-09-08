import { entityGenerators, expect, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeCreateEmployee } from "./createEmployee";

describe("action createEmployee", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createEmployee: ReturnType<typeof makeCreateEmployee>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createEmployee = makeCreateEmployee({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should insert the given employee", async () => {
        const employee = entityGenerators.generateHourlyEmployee();
        stubbedEmployeeRepository.insert.resolves();

        await createEmployee(employee);

        expect(stubbedEmployeeRepository.insert).to.have.been.calledOnceWithEntity(employee);
    });
});
