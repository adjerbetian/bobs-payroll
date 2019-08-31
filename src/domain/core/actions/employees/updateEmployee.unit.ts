import { buildStubEmployeeRepository, expect, generateIndex, Stub } from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { buildUpdateEmployee, UpdateEmployee } from "./updateEmployee";

describe("action updateEmployee", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let updateEmployee: UpdateEmployee;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        updateEmployee = buildUpdateEmployee({ employeeRepository: stubEmployeeRepository });
    });

    it("should update the given employee", async () => {
        const employeeId = generateIndex();
        stubEmployeeRepository.updateById.resolves();

        await updateEmployee(employeeId, { name: "James Bond" });

        expect(stubEmployeeRepository.updateById).to.have.been.calledOnceWith(employeeId, { name: "James Bond" });
    });
});
