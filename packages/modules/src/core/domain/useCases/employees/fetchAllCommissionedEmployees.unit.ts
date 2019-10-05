import { generators, expect, Stub } from "../../../../test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeFetchAllCommissionedEmployees } from "./fetchAllCommissionedEmployees";

describe("use case - fetchAllCommissionedEmployees", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllCommissionedEmployees: ReturnType<typeof makeFetchAllCommissionedEmployees>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllCommissionedEmployees = makeFetchAllCommissionedEmployees({
            employeeRepository: stubbedEmployeeRepository
        });
    });

    it("should return all the commissioned employees", async () => {
        const employees = [generators.generateCommissionedEmployee(), generators.generateCommissionedEmployee()];
        stubbedEmployeeRepository.fetchAllCommissioned.resolves(employees);

        const result = await fetchAllCommissionedEmployees();

        expect(result).to.deep.equal(employees);
    });
});
