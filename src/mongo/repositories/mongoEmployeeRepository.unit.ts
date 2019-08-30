import { buildStubMongoDbAdapter, expect, generateHourlyEmployee, generateIndex, Stub } from "@test/unit";
import { Employee, EmployeeRepository, EmployeeType, HourlyEmployee } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoEmployeeRepository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    let repository: EmployeeRepository;
    let stubDb: Stub<MongoDbAdapter<Employee>>;

    beforeEach(() => {
        stubDb = buildStubMongoDbAdapter();
        repository = buildMongoEmployeeRepository(stubDb);
    });

    describe("fetchById", () => {
        it("should return the employee", async () => {
            const employee = generateHourlyEmployee();
            stubDb.fetch.withArgs({ id: employee.id }).resolves(employee);

            const dbEmployee = await repository.fetchById(employee.id);

            expect(dbEmployee).to.deep.equal(employee);
        });
    });
    describe("insert", () => {
        it("insert the given employee", async () => {
            const employee = generateHourlyEmployee();
            stubDb.insert.resolves();

            await repository.insert(employee);

            expect(stubDb.insert).to.have.been.calledWith(employee);
        });
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const query = { id: generateIndex() };
            stubDb.exists.withArgs(query).resolves(true);

            const result = await repository.exists(query);

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            const query = { id: generateIndex() };
            stubDb.exists.withArgs(query).resolves(false);

            const result = await repository.exists(query);

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee", async () => {
            const employeeId = generateIndex();
            await stubDb.remove.resolves();

            await repository.deleteById(employeeId);

            expect(stubDb.remove).to.have.been.calledWith({ id: employeeId });
        });
    });
    describe("updateById", () => {
        beforeEach(() => stubDb.update.resolves());

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

            expect(stubDb.update).to.have.been.calledWith({ id: employeeId }, { $set: update });
        });
    });

    describe("fetchAllHourly", () => {
        it("should only fetch hourly employees", async () => {
            const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
            stubDb.fetchAll.withArgs({ "work.type": EmployeeType.HOURLY }).resolves(employees);

            const result = await repository.fetchAllHourly();

            expect(result).to.deep.equal(employees);
        });
    });
});
