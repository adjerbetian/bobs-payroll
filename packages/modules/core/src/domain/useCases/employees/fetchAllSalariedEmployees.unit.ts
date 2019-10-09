import { expect, Stub } from "@payroll/test";
import { generators } from "../../../test";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeFetchAllSalariedEmployees } from "./fetchAllSalariedEmployees";

describe("use case - fetchAllSalariedEmployees", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllSalariedEmployees: ReturnType<typeof makeFetchAllSalariedEmployees>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllSalariedEmployees = makeFetchAllSalariedEmployees({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the salaried employees", async () => {
        const employees = [generators.generateSalariedEmployee(), generators.generateSalariedEmployee()];
        stubbedEmployeeRepository.fetchAllSalaried.resolves(employees);

        const result = await fetchAllSalariedEmployees();

        expect(result).to.deep.equal(employees);
    });
});
