import { expect, generateIndex } from "@payroll/test";
import { generators, seeders } from "../../test";
import { CommissionedEmployee, Employee, EmployeeType, HourlyEmployee, SalariedEmployee } from "../../domain";
import { dbEmployees } from "../collections";
import { makeMongoEmployeeRepository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    let repository: ReturnType<typeof makeMongoEmployeeRepository>;

    beforeEach(() => {
        repository = makeMongoEmployeeRepository(dbEmployees);
    });

    describe("fetchById", () => {
        it("should return the hourly employee", async () => {
            const employee = await seeders.seedHourlyEmployee();
            await assertEmployeeCanBeFetched(employee);
        });
        it("should return the salaried employee", async () => {
            const employee = await seeders.seedSalariedEmployee();
            await assertEmployeeCanBeFetched(employee);
        });
        it("should return the commissioned employee", async () => {
            const employee = await seeders.seedCommissionedEmployee();
            await assertEmployeeCanBeFetched(employee);
        });

        async function assertEmployeeCanBeFetched(employee: Employee): Promise<void> {
            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee).entity.to.equal(employee);
        }
    });
    describe("insert", () => {
        it("should insert the hourly employee", async () => {
            const employee = generators.generateHourlyEmployee();
            await assertEmployeeCanBeInserted(employee);
        });
        it("should insert the salaried employee", async () => {
            const employee = generators.generateSalariedEmployee();
            await assertEmployeeCanBeInserted(employee);
        });
        it("should insert the salaried employee", async () => {
            const employee = generators.generateCommissionedEmployee();
            await assertEmployeeCanBeInserted(employee);
        });

        async function assertEmployeeCanBeInserted(employee: Employee): Promise<void> {
            await repository.insert(employee);

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee).entity.to.equal(employee);
        }
    });
    describe("exists", () => {
        it("should return true when the employee exists", async () => {
            const employee = await seeders.seedHourlyEmployee();

            const result = await repository.exists(employee.getId());

            expect(result).to.be.true;
        });
        it("should return false when the employee exists", async () => {
            await seeders.seedHourlyEmployee();

            const result = await repository.exists(generateIndex());

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("should delete the employee", async () => {
            const employee = await seeders.seedHourlyEmployee();

            await repository.deleteById(employee.getId());

            const result = await repository.exists(employee.getId());
            expect(result).to.be.false;
        });
    });
    describe("updateById", () => {
        it("should update the employee name", async () => {
            const employee = await seeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), { name: "James Bond" });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getName()).to.equal("James Bond");
        });
        it("should update the employee address", async () => {
            const employee = await seeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), { address: "my new address" });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getAddress()).to.equal("my new address");
        });
        it("should update the employee type to hourly", async () => {
            const employee = await seeders.seedSalariedEmployee();

            await repository.updateById(employee.getId(), { type: EmployeeType.HOURLY, hourlyRate: 10 });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getType()).to.equal(EmployeeType.HOURLY);
            expect((dbEmployee as HourlyEmployee).getHourlyRate()).to.equal(10);
        });
        it("should update the employee type to salaried", async () => {
            const employee = await seeders.seedHourlyEmployee();

            await repository.updateById(employee.getId(), { type: EmployeeType.SALARIED, salary: 1000 });

            const dbEmployee = await repository.fetchById(employee.getId());
            expect(dbEmployee.getType()).to.equal(EmployeeType.SALARIED);
            expect((dbEmployee as SalariedEmployee).getSalary()).to.equal(1000);
        });
        it("should update the employee type to commissioned", async () => {
            const employee = await seeders.seedHourlyEmployee();

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
            const hourlyEmployees = [await seeders.seedHourlyEmployee(), await seeders.seedHourlyEmployee()];
            await seeders.seedSalariedEmployee();
            await seeders.seedCommissionedEmployee();

            const result = await repository.fetchAllHourly();

            expect(result).entities.to.equal(hourlyEmployees);
        });
    });
    describe("fetchAllSalaried", () => {
        it("should only fetch hourly employees", async () => {
            const salariedEmployees = [await seeders.seedSalariedEmployee(), await seeders.seedSalariedEmployee()];
            await seeders.seedHourlyEmployee();
            await seeders.seedCommissionedEmployee();

            const result = await repository.fetchAllSalaried();

            expect(result).entities.to.equal(salariedEmployees);
        });
    });
    describe("fetchAllCommissioned", () => {
        it("should only fetch hourly employees", async () => {
            const commissionedEmployees = [
                await seeders.seedCommissionedEmployee(),
                await seeders.seedCommissionedEmployee()
            ];
            await seeders.seedHourlyEmployee();
            await seeders.seedSalariedEmployee();

            const result = await repository.fetchAllCommissioned();

            expect(result).entities.to.equal(commissionedEmployees);
        });
    });
});
