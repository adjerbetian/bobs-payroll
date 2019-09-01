import { expect, generateCommissionedEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { buildFetchAllCommissionedEmployees } from "./fetchAllCommissionedEmployees";

describe("action fetchAllCommissionedEmployees", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllCommissionedEmployees: ReturnType<typeof buildFetchAllCommissionedEmployees>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllCommissionedEmployees = buildFetchAllCommissionedEmployees({
            employeeRepository: stubbedEmployeeRepository
        });
    });

    it("should return all the commissioned employees", async () => {
        const employees = [generateCommissionedEmployee(), generateCommissionedEmployee()];
        stubbedEmployeeRepository.fetchAllCommissioned.resolves(employees);

        const result = await fetchAllCommissionedEmployees();

        expect(result).to.deep.equal(employees);
    });
});