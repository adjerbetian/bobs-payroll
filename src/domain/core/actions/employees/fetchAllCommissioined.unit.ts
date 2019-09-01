import { expect, generateCommissionedEmployee, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { buildFetchAllCommissioned } from "./fetchAllCommissioned";

describe("action fetchAllCommissioned", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let fetchAllCommissioned: ReturnType<typeof buildFetchAllCommissioned>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        fetchAllCommissioned = buildFetchAllCommissioned({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should return all the commissioned employees", async () => {
        const employees = [generateCommissionedEmployee(), generateCommissionedEmployee()];
        stubbedEmployeeRepository.fetchAllCommissioned.resolves(employees);

        const result = await fetchAllCommissioned();

        expect(result).to.deep.equal(employees);
    });
});
