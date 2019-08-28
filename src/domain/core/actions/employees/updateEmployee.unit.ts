import { buildFakeEmployeeRepository, Fake } from "../../../../../test/fakeBuilders";
import { generateIndex } from "../../../../../test/generators";
import { expect } from "../../../../../test/unitTest";
import { EmployeeRepository } from "../../repositories";
import { buildUpdateEmployeeAction, UpdateEmployeeAction } from "./updateEmployee";

describe("action updateEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let updateEmployee: UpdateEmployeeAction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        updateEmployee = buildUpdateEmployeeAction({ employeeRepository: fakeEmployeeRepository });
    });

    it("should update the given employee", async () => {
        const employeeId = generateIndex();
        fakeEmployeeRepository.updateById.resolves();

        await updateEmployee(employeeId, { name: "James Bond" });

        expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employeeId, { name: "James Bond" });
    });
});
