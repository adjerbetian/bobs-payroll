import { expect, generateHourlyEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeFetchAllHourlyEmployees } from "./fetchAllHourlyEmployees";

describe("action fetchAllHourlyEmployees", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllHourlyEmployees: ReturnType<typeof makeFetchAllHourlyEmployees>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllHourlyEmployees = makeFetchAllHourlyEmployees({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the hourly employees", async () => {
        const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
        stubbedEmployeeRepository.fetchAllHourly.resolves(employees);

        const result = await fetchAllHourlyEmployees();

        expect(result).to.deep.equal(employees);
    });
});
