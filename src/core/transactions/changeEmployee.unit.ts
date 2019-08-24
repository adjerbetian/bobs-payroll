import { buildFakeEmployeeRepository, Fake } from "../../../test/fakeBuilders";
import { generateHourlyEmployee, generateSalariedEmployee } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { EmployeeType } from "../entities";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository } from "../repositories";
import { buildChangeEmployeeTransaction } from "./changeEmployee";
import { Transaction } from "./Transactions";

describe("addEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let changeEmployee: Transaction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        changeEmployee = buildChangeEmployeeTransaction({
            employeeRepository: fakeEmployeeRepository
        });

        fakeEmployeeRepository.updateById.resolves();
    });

    it("should update the employee's name", async () => {
        const employee = generateHourlyEmployee();

        await changeEmployee(`${employee.id}`, "Name", "James Bond");

        expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
            name: "James Bond"
        });
    });
    it("should update the employee's address", async () => {
        const employee = generateHourlyEmployee();

        await changeEmployee(`${employee.id}`, "Address", "my new address");

        expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
            address: "my new address"
        });
    });
    it("should change the employee's type to hourly and set the rate", async () => {
        const employee = generateSalariedEmployee();

        await changeEmployee(`${employee.id}`, "Hourly", "10.5");

        expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
            type: EmployeeType.HOURLY,
            hourlyRate: 10.5
        });
    });
    it("should throw an error if the rate is not defined", async () => {
        const employee = generateSalariedEmployee();

        // noinspection ES6MissingAwait
        const promise = changeEmployee(`${employee.id}`, "Hourly", "");

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
    });
});
