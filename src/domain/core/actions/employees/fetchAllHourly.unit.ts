import { expect, generateHourlyEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { buildFetchAllHourly } from "./fetchAllHourly";

describe("action fetchAllHourly", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllHourly: ReturnType<typeof buildFetchAllHourly>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllHourly = buildFetchAllHourly({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the hourly employees", async () => {
        const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
        stubbedEmployeeRepository.fetchAllHourly.resolves(employees);

        const result = await fetchAllHourly();

        expect(result).to.deep.equal(employees);
    });
});
