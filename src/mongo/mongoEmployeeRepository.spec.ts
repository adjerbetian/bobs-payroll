import { generateHourlyEmployee } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateIndex } from "../../test/utils";
import { NotFoundError } from "../domain";
import { dbEmployees as db } from "./db";
import { mongoEmployeeRepository as repository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    describe("fetchById", () => {
        it("should return the employee", async () => {
            const employee = generateHourlyEmployee();
            await db.insert(employee);

            const dbEmployee = await repository.fetchById(employee.id);

            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should not return the _id field", async () => {
            const employee = generateHourlyEmployee();
            await db.insert(employee);

            const dbEmployee = await repository.fetchById(employee.id);

            expect(dbEmployee).not.to.have.property("_id");
        });
        it("should throw a not found error when the employee was not found", async () => {
            const promise = repository.fetchById(1234);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insert", () => {
        it("insert the given employee", async () => {
            const employee = generateHourlyEmployee();

            await repository.insert(employee);

            const dbEmployee = await db.fetch({ id: employee.id });
            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should not add the _id field to the entity", async () => {
            const employee = generateHourlyEmployee();

            await repository.insert(employee);

            expect(employee).not.to.have.property("_id");
        });
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const employee = generateHourlyEmployee();
            await db.insert(employee);

            const result = await repository.exists({ id: employee.id });

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            const employee = generateHourlyEmployee();

            const result = await repository.exists({ id: employee.id });

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee when it exists", async () => {
            const employee = generateHourlyEmployee();
            await db.insert(employee);

            await repository.deleteById(employee.id);

            const result = await db.exists({ id: employee.id });
            expect(result).to.be.false;
        });
        it("throw a NotFoundError when the employee does not exists", async () => {
            const promise = repository.deleteById(generateIndex());

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("updateById", () => {
        it("update the employee when it exists", async () => {
            const employee = generateHourlyEmployee();
            await db.insert(employee);

            await repository.updateById(employee.id, { name: "James Bond" });

            const dbEmployee = await db.fetch({ id: employee.id });
            expect(dbEmployee.name).to.equal("James Bond");
        });
        it("throw a NotFoundError when the employee does not exists", async () => {
            const promise = repository.updateById(generateIndex(), {
                name: "James Bond"
            });

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
});
