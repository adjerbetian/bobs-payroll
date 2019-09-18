import { expect, generateIndex, Stub } from "@test/unit";
import { RouteFormatError } from "../../../../router";
import { CoreActions } from "../../domain";
import { buildStubbedCoreActions } from "../test";
import { makeDeleteEmployeeController } from "./deleteEmployee";

describe("deleteEmployee", () => {
    let stubbedActions: Stub<CoreActions>;
    let deleteEmployee: ReturnType<typeof makeDeleteEmployeeController>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        deleteEmployee = makeDeleteEmployeeController(stubbedActions);

        stubbedActions.deleteEmployee.resolves();
    });

    it("should delete the employee", async () => {
        const employeeId = generateIndex();

        await deleteEmployee(`${employeeId}`);

        expect(stubbedActions.deleteEmployee).to.have.been.calledOnceWith(employeeId);
    });
    it("should throw a RouteFormatError if the employee id is not given", async () => {
        const promise = deleteEmployee(``);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "DelEmp");
    });
});
