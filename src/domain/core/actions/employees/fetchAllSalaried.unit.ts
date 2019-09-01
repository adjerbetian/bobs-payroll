import { expect, generateSalariedEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { buildFetchAllSalaried } from "./fetchAllSalaried";

describe("action fetchAllSalaried", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllSalaried: ReturnType<typeof buildFetchAllSalaried>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllSalaried = buildFetchAllSalaried({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the salaried employees", async () => {
        const employees = [generateSalariedEmployee(), generateSalariedEmployee()];
        stubbedEmployeeRepository.fetchAllSalaried.resolves(employees);

        const result = await fetchAllSalaried();

        expect(result).to.deep.equal(employees);
    });
});
