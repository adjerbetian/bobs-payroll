import { expect } from "../../test/unitTest";
import { generateHourlyRateEmployee } from "../../test/generators";
import { buildFakeEmployeeRepository, FakeEmployeeRepository } from "../../test/fakeBuilders";
import { Transaction } from "./Transactions";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { TransactionFormatError } from "../errors/TransactionFormatError";

describe("deleteEmployee", () => {
    let fakeEmployeeRepository: FakeEmployeeRepository;
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

        await expect(promise).to.be.rejectedWith(TransactionFormatError);
    });
});
