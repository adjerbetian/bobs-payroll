import { expect, generateIndex, Stub } from "../../../../../test/unit";
import { CoreUseCases } from "../../domain";
import { RouteFormatError } from "../errors";
import { buildStubbedCoreUseCases } from "../test";
import { makeDeleteEmployeeController } from "./deleteEmployee";

describe("deleteEmployee", () => {
    let stubbedUseCases: Stub<CoreUseCases>;
    let deleteEmployee: ReturnType<typeof makeDeleteEmployeeController>;

    beforeEach(() => {
        stubbedUseCases = buildStubbedCoreUseCases();
        deleteEmployee = makeDeleteEmployeeController(stubbedUseCases);

        stubbedUseCases.deleteEmployee.resolves();
    });

    it("should delete the employee", async () => {
        const employeeId = generateIndex();

        await deleteEmployee(`${employeeId}`);

        expect(stubbedUseCases.deleteEmployee).to.have.been.calledOnceWith(employeeId);
    });
    it("should throw a RouteFormatError if the employee id is not given", async () => {
        const promise = deleteEmployee(``);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "DelEmp");
    });
});
