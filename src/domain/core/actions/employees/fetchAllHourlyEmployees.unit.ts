import { expect, generateHourlyEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { buildFetchAllHourlyEmployees } from "./fetchAllHourlyEmployees";

describe("action fetchAllHourlyEmployees", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllHourlyEmployees: ReturnType<typeof buildFetchAllHourlyEmployees>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllHourlyEmployees = buildFetchAllHourlyEmployees({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the hourly employees", async () => {
        const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
        stubbedEmployeeRepository.fetchAllHourly.resolves(employees);

        const result = await fetchAllHourlyEmployees();

        expect(result).to.deep.equal(employees);
    });
});
