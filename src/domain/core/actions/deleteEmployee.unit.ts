import { buildFakeEmployeeRepository, Fake } from "../../../../test/fakeBuilders";
import { expect } from "../../../../test/unitTest";
import { generateIndex } from "../../../../test/utils";
import { EmployeeRepository } from "../repositories";
import { buildDeleteEmployeeAction, DeleteEmployeeAction } from "./deleteEmployee";

describe("action deleteEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let deleteEmployee: DeleteEmployeeAction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        deleteEmployee = buildDeleteEmployeeAction({
            employeeRepository: fakeEmployeeRepository
        });
    });

    it("should delete the employee", async () => {
        fakeEmployeeRepository.deleteById.resolves();
        const employeeId = generateIndex();

        await deleteEmployee(employeeId);

        expect(fakeEmployeeRepository.deleteById).to.have.been.calledOnceWith(employeeId);
    });
});
