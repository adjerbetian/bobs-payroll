import { expect, generateIndex, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildStubbedEmployeeRepository } from "../../test";
import { buildUpdateEmployee, UpdateEmployee } from "./updateEmployee";

describe("action updateEmployee", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let updateEmployee: UpdateEmployee;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        updateEmployee = buildUpdateEmployee({ employeeRepository: stubbedEmployeeRepository });
    });

    it("should update the given employee", async () => {
        const employeeId = generateIndex();
        stubbedEmployeeRepository.updateById.resolves();

        await updateEmployee(employeeId, { name: "James Bond" });

        expect(stubbedEmployeeRepository.updateById).to.have.been.calledOnceWith(employeeId, { name: "James Bond" });
    });
});
