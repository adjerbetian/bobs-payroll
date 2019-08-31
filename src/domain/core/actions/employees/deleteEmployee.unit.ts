import { buildStubbedEmployeeRepository, expect, generateIndex, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildDeleteEmployee, DeleteEmployee } from "./deleteEmployee";

describe("action deleteEmployee", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let deleteEmployee: DeleteEmployee;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        deleteEmployee = buildDeleteEmployee({
            employeeRepository: stubbedEmployeeRepository
        });
    });

    it("should delete the employee", async () => {
        stubbedEmployeeRepository.deleteById.resolves();
        const employeeId = generateIndex();

        await deleteEmployee(employeeId);

        expect(stubbedEmployeeRepository.deleteById).to.have.been.calledOnceWith(employeeId);
    });
});
