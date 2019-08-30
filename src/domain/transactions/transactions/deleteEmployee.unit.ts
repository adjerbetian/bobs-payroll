import { buildStubActions, Stub } from "../../../../test/stubBuilders";
import { generateIndex } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { Actions } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";

describe("deleteEmployee", () => {
    let stubActions: Stub<Actions>;
    let deleteEmployee: Transaction;

    beforeEach(() => {
        stubActions = buildStubActions();
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
