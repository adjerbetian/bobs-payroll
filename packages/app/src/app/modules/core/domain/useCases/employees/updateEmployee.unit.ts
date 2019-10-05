import { expect, generateIndex, Stub } from "../../../../../../test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { makeUpdateEmployee } from "./updateEmployee";

describe("use case - updateEmployee", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let updateEmployee: ReturnType<typeof makeUpdateEmployee>;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        updateEmployee = makeUpdateEmployee({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should update the given employee", async () => {
        const employeeId = generateIndex();
        stubbedEmployeeRepository.updateById.resolves();

        await updateEmployee(employeeId, { name: "James Bond" });

        expect(stubbedEmployeeRepository.updateById).to.have.been.calledOnceWith(employeeId, {
            name: "James Bond"
        });
    });
});
