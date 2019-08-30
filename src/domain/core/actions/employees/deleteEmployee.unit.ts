import { buildStubEmployeeRepository, expect, generateIndex, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildDeleteEmployeeAction, DeleteEmployeeAction } from "./deleteEmployee";

describe("action deleteEmployee", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let deleteEmployee: DeleteEmployeeAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        deleteEmployee = buildDeleteEmployeeAction({
            employeeRepository: stubEmployeeRepository
        });
    });

    it("should delete the employee", async () => {
        stubEmployeeRepository.deleteById.resolves();
        const employeeId = generateIndex();

        await deleteEmployee(employeeId);

        expect(stubEmployeeRepository.deleteById).to.have.been.calledOnceWith(employeeId);
    });
});
