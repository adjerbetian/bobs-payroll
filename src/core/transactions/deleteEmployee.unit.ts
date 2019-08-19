import { buildFakeEmployeeRepository, Fake } from "../../../test/fakeBuilders";
import { generateHourlyRateEmployee } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository } from "../repositories";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { Transaction } from "./Transactions";

describe("deleteEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let deleteEmployee: Transaction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        deleteEmployee = buildDeleteEmployeeTransaction({
            employeeRepository: fakeEmployeeRepository
        });

        fakeEmployeeRepository.deleteById.resolves();
    });

    it("should delete the employee", async () => {
        const employee = generateHourlyRateEmployee();

        await deleteEmployee(`${employee.id}`);

        expect(fakeEmployeeRepository.deleteById).to.have.been.calledOnceWith(employee.id);
    });
    it("should throw a TransactionFormatError if the employee id is not given", async () => {
        // noinspection ES6MissingAwait
        const promise = deleteEmployee(``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "DelEmp");
    });
});
