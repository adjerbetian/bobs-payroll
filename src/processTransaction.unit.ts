import { expect } from "../test/unitTest";
import { generateHourlyRateEmployee } from "../test/generators";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildFakeTransactions, FakeTransactions } from "../test/fakeBuilders";

describe("processTransaction", () => {
    describe("addEmp", () => {
        let processTransaction: ProcessTransaction;
        let fakeTransactions: FakeTransactions;

        beforeEach(() => {
            fakeTransactions = buildFakeTransactions();
            processTransaction = buildProcessTransaction(fakeTransactions);
        });

        it("should call the insertOne method of the employeeRepository", async () => {
            fakeTransactions.addEmployee.resolves();
            const employee = generateHourlyRateEmployee();

            await processTransaction(
                "AddEmp",
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.hourlyRate}`
            );

            expect(fakeTransactions.addEmployee).to.have.been.calledOnceWith(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.hourlyRate}`
            );
        });
    });
});
