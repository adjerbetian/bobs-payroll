import { buildFakeEmployeeRepository, Fake } from "../../../test/fakeBuilders";
import { generateHourlyRateEmployee } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
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
        const employee = generateHourlyRateEmployee();

        await changeEmployee(`${employee.id}`, "Name", "James Bond");

        expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
            name: "James Bond"
        });
    });
    it("should update the employee's address", async () => {
        const employee = generateHourlyRateEmployee();

        await changeEmployee(`${employee.id}`, "Address", "my new address");

        expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
            address: "my new address"
        });
    });
});
