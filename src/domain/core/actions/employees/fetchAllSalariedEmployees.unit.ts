import { expect, generateSalariedEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeFetchAllSalariedEmployees } from "./fetchAllSalariedEmployees";

describe("action fetchAllSalariedEmployees", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllSalariedEmployees: ReturnType<typeof makeFetchAllSalariedEmployees>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllSalariedEmployees = makeFetchAllSalariedEmployees({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the salaried employees", async () => {
        const employees = [generateSalariedEmployee(), generateSalariedEmployee()];
        stubbedEmployeeRepository.fetchAllSalaried.resolves(employees);

        const result = await fetchAllSalariedEmployees();

        expect(result).to.deep.equal(employees);
    });
});
