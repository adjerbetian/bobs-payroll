import { entityGenerators, entitySeeders, expect, generateIndex } from "@test/integration";
import { CommissionedEmployee, Employee, EmployeeType, HourlyEmployee, SalariedEmployee } from "../../domain";
import { dbEmployees } from "../databases";
import { makeMongoEmployeeRepository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    let repository: ReturnType<typeof makeMongoEmployeeRepository>;

    beforeEach(() => {
        repository = makeMongoEmployeeRepository(dbEmployees);
    });

    describe("fetchById", () => {
        it("should return the hourly employee", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();
            await assertEmployeeCanBeFetched(employee);
        });
        it("should return the salaried employee", async () => {
            const employee = await entitySeeders.seedSalariedEmployee();
            await assertEmployeeCanBeFetched(employee);
        });
        it("should return the commissioned employee", async () => {
            const employee = await entitySeeders.seedCommissionedEmployee();
            await assertEmployeeCanBeFetched(employee);
        });

        async function assertEmployeeCanBeFetched(employee: Employee): Promise<void> {
            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee).entity.to.equal(employee);
        }
    });
    describe("insert", () => {
        it("insert the hourly employee", async () => {
            const employee = entityGenerators.generateHourlyEmployee();
            await assertEmployeeCanBeInserted(employee);
        });
        it("insert the salaried employee", async () => {
            const employee = entityGenerators.generateSalariedEmployee();
            await assertEmployeeCanBeInserted(employee);
        });
        it("insert the salaried employee", async () => {
            const employee = entityGenerators.generateCommissionedEmployee();
            await assertEmployeeCanBeInserted(employee);
        });

        async function assertEmployeeCanBeInserted(employee: Employee): Promise<void> {
            await repository.insert(employee);

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee).entity.to.equal(employee);
        }
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();

            const result = await repository.exists(employee.getId());

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            await entitySeeders.seedHourlyEmployee();

            const result = await repository.exists(generateIndex());

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();

            await repository.deleteById(employee.getId());

            const result = await repository.exists(employee.getId());
            expect(result).to.be.false;
        });
    });
    describe("updateById", () => {
        it("should update the employee name", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), { name: "James Bond" });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getName()).to.equal("James Bond");
        });
        it("should update the employee address", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), { address: "my new address" });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getAddress()).to.equal("my new address");
        });
        it("should update the employee type to hourly", async () => {
            const employee = await entitySeeders.seedSalariedEmployee();

            await repository.updateById(employee.getId(), { type: EmployeeType.HOURLY, hourlyRate: 10 });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getType()).to.equal(EmployeeType.HOURLY);
            expect((dbEmployee as HourlyEmployee).getHourlyRate()).to.equal(10);
        });
        it("should update the employee type to salaried", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), { type: EmployeeType.SALARIED, salary: 1000 });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getType()).to.equal(EmployeeType.SALARIED);
            expect((dbEmployee as SalariedEmployee).getSalary()).to.equal(1000);
        });
        it("should update the employee type to commissioned", async () => {
            const employee = await entitySeeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), {
                type: EmployeeType.COMMISSIONED,
                salary: 1000,
                commissionRate: 0.1
            });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getType()).to.equal(EmployeeType.COMMISSIONED);
            expect((dbEmployee as CommissionedEmployee).getSalary()).to.equal(1000);
            expect((dbEmployee as CommissionedEmployee).getCommissionRate()).to.equal(0.1);
        });
    });
    describe("fetchAllHourly", () => {
        it("should only fetch hourly employees", async () => {
            const hourlyEmployees = [
                await entitySeeders.seedHourlyEmployee(),
                await entitySeeders.seedHourlyEmployee()
            ];
            await entitySeeders.seedSalariedEmployee();
            await entitySeeders.seedCommissionedEmployee();

            const result = await repository.fetchAllHourly();

            expect(result).entities.to.equal(hourlyEmployees);
        });
    });
    describe("fetchAllSalaried", () => {
        it("should only fetch hourly employees", async () => {
            const salariedEmployees = [
                await entitySeeders.seedSalariedEmployee(),
                await entitySeeders.seedSalariedEmployee()
            ];
            await entitySeeders.seedHourlyEmployee();
            await entitySeeders.seedCommissionedEmployee();

            const result = await repository.fetchAllSalaried();

            expect(result).entities.to.equal(salariedEmployees);
        });
    });
    describe("fetchAllCommissioned", () => {
        it("should only fetch hourly employees", async () => {
            const commissionedEmployees = [
                await entitySeeders.seedCommissionedEmployee(),
                await entitySeeders.seedCommissionedEmployee()
            ];
            await entitySeeders.seedHourlyEmployee();
            await entitySeeders.seedSalariedEmployee();

            const result = await repository.fetchAllCommissioned();

            expect(result).entities.to.equal(commissionedEmployees);
        });
    });
});
