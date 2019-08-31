import { buildStubCoreActions, expect, generateIndex, Stub } from "@test/unit";
import { CoreActions } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";

describe("deleteEmployee", () => {
    let stubActions: Stub<CoreActions>;
    let deleteEmployee: Transaction;

    beforeEach(() => {
        stubActions = buildStubCoreActions();
        deleteEmployee = buildDeleteEmployeeTransaction(stubActions);

        stubActions.deleteEmployee.resolves();
    });

    it("should delete the employee", async () => {
        const employeeId = generateIndex();

        await deleteEmployee(`${employeeId}`);

        expect(stubActions.deleteEmployee).to.have.been.calledOnceWith(employeeId);
    });
    it("should throw a TransactionFormatError if the employee id is not given", async () => {
        const promise = deleteEmployee(``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "DelEmp");
    });
});
