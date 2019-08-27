import { buildFakeEmployeeRepository, Fake } from "../../../../../test/fakeBuilders";
import { generateHourlyEmployee } from "../../../../../test/generators";
import { expect } from "../../../../../test/unitTest";
import { EmployeeRepository } from "../../repositories";
import { buildCreateEmployeeAction, CreateEmployeeAction } from "./createEmployee";

describe("action createEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let createEmployee: CreateEmployeeAction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        createEmployee = buildCreateEmployeeAction({ employeeRepository: fakeEmployeeRepository });
    });

    it("should insert the given employee", async () => {
        const employee = generateHourlyEmployee();
        fakeEmployeeRepository.insert.resolves();

        await createEmployee(employee);

        expect(fakeEmployeeRepository.insert).to.have.been.calledOnceWith(employee);
    });
});
