import {
    expect,
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateIndex,
    generateSalariedEmployee,
    Stub
} from "@test/unit";
import { Employee, EmployeeType, HourlyEmployee } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildStubbedMongoDbAdapter } from "../test";
import { makeMongoEmployeeRepository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    let repository: ReturnType<typeof makeMongoEmployeeRepository>;
    let stubbedDb: Stub<MongoDbAdapter<Employee>>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = makeMongoEmployeeRepository(stubbedDb);
    });

    describe("fetchById", () => {
        it("should return the employee", async () => {
            const employee = generateHourlyEmployee();
            stubbedDb.fetch.withArgs({ id: employee.id }).resolves(employee);

            const dbEmployee = await repository.fetchById(employee.id);

            expect(dbEmployee).to.deep.equal(employee);
        });
    });
    describe("insert", () => {
        it("insert the given employee", async () => {
            const employee = generateHourlyEmployee();
            stubbedDb.insert.resolves();

            await repository.insert(employee);

            expect(stubbedDb.insert).to.have.been.calledWith(employee);
        });
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const query = { id: generateIndex() };
            stubbedDb.exists.withArgs(query).resolves(true);

            const result = await repository.exists(query);

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            const query = { id: generateIndex() };
            stubbedDb.exists.withArgs(query).resolves(false);

            const result = await repository.exists(query);

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee", async () => {
            const employeeId = generateIndex();
            await stubbedDb.remove.resolves();

            await repository.deleteById(employeeId);

            expect(stubbedDb.remove).to.have.been.calledWith({ id: employeeId });
        });
    });
    describe("updateById", () => {
        beforeEach(() => stubbedDb.update.resolves());

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

            expect(stubbedDb.update).to.have.been.calledWith({ id: employeeId }, { $set: update });
        });
    });

    describe("fetchAllHourly", () => {
        it("should only fetch hourly employees", async () => {
            const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
            stubbedDb.fetchAll.withArgs({ "work.type": EmployeeType.HOURLY }).resolves(employees);

            const result = await repository.fetchAllHourly();

            expect(result).to.deep.equal(employees);
        });
    });
    describe("fetchAllSalaried", () => {
        it("should only fetch salaried employees", async () => {
            const employees = [generateSalariedEmployee(), generateSalariedEmployee()];
            stubbedDb.fetchAll.withArgs({ "work.type": EmployeeType.SALARIED }).resolves(employees);

            const result = await repository.fetchAllSalaried();

            expect(result).to.deep.equal(employees);
        });
    });
    describe("fetchAllCommissioned", () => {
        it("should only fetch commissioned employees", async () => {
            const employees = [generateCommissionedEmployee(), generateCommissionedEmployee()];
            stubbedDb.fetchAll.withArgs({ "work.type": EmployeeType.COMMISSIONED }).resolves(employees);

            const result = await repository.fetchAllCommissioned();

            expect(result).to.deep.equal(employees);
        });
    });
});
