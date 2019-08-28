import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateHourlyEmployee, generateIndex } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { Employee, EmployeeRepository, EmployeeType, HourlyEmployee } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoEmployeeRepository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    let repository: EmployeeRepository;
    let fakeDb: Fake<MongoDbAdapter<Employee>>;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoEmployeeRepository(fakeDb);
    });

    describe("fetchById", () => {
        it("should return the employee", async () => {
            const employee = generateHourlyEmployee();
            fakeDb.fetch.withArgs({ id: employee.id }).resolves(employee);

            const dbEmployee = await repository.fetchById(employee.id);

            expect(dbEmployee).to.deep.equal(employee);
        });
    });
    describe("insert", () => {
        it("insert the given employee", async () => {
            const employee = generateHourlyEmployee();
            fakeDb.insert.resolves();

            await repository.insert(employee);

            expect(fakeDb.insert).to.have.been.calledWith(employee);
        });
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const query = { id: generateIndex() };
            fakeDb.exists.withArgs(query).resolves(true);

            const result = await repository.exists(query);

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            const query = { id: generateIndex() };
            fakeDb.exists.withArgs(query).resolves(false);

            const result = await repository.exists(query);

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee", async () => {
            const employeeId = generateIndex();
            await fakeDb.remove.resolves();

            await repository.deleteById(employeeId);

            expect(fakeDb.remove).to.have.been.calledWith({ id: employeeId });
        });
    });
    describe("updateById", () => {
        beforeEach(() => fakeDb.update.resolves());

        it("should update the employee information", async () => {
            const employeeId = generateIndex();
            const update: Partial<HourlyEmployee> = {
                name: "James Bond",
                work: {
                    type: EmployeeType.HOURLY,
                    hourlyRate: 10
                }
            };

            await repository.updateById(employeeId, update);

            expect(fakeDb.update).to.have.been.calledWith({ id: employeeId }, { $set: update });
        });
    });
});
