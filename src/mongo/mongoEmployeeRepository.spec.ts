import { generateHourlyEmployee, generateUnionEmployee } from "../../test/generators";
import "../../test/integrationTest";
import { seedHourlyEmployee } from "../../test/seeders";
import { expect } from "../../test/unitTest";
import { generateIndex } from "../../test/utils";
import { NotFoundError } from "../domain";
import { mongoEmployeeRepository } from "./mongoEmployeeRepository";

describe("mongoEmployeeRepository", () => {
    describe("fetchById", () => {
        it("should return the employee", async () => {
            const employee = generateHourlyEmployee();
            await mongoEmployeeRepository.insertOne(employee);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);

            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should not return the _id field", async () => {
            const employee = generateHourlyEmployee();
            await mongoEmployeeRepository.insertOne(employee);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);

            expect(dbEmployee).not.to.have.property("_id");
        });
        it("should throw a not found error when the employee was not found", async () => {
            // noinspection ES6MissingAwait
            const promise = mongoEmployeeRepository.fetchById(1234);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("fetchByMemberId", () => {
        it("should return the employee matching the memberId", async () => {
            const employee = generateUnionEmployee();
            await mongoEmployeeRepository.insertOne(employee);

            const dbEmployee = await mongoEmployeeRepository.fetchByMemberId(employee.memberId);

            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should throw a not found error when the employee was not found", async () => {
            const employee = generateHourlyEmployee();
            await mongoEmployeeRepository.insertOne(employee);

            // noinspection ES6MissingAwait
            const promise = mongoEmployeeRepository.fetchByMemberId(employee.memberId);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insertOne", () => {
        it("insert the given employee", async () => {
            const employee = generateHourlyEmployee();

            await mongoEmployeeRepository.insertOne(employee);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should not add the _id field to the entity", async () => {
            const employee = generateHourlyEmployee();

            await mongoEmployeeRepository.insertOne(employee);

            expect(employee).not.to.have.property("_id");
        });
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const employee = generateHourlyEmployee();
            await mongoEmployeeRepository.insertOne(employee);

            const result = await mongoEmployeeRepository.exists({ id: employee.id });

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            const employee = generateHourlyEmployee();

            const result = await mongoEmployeeRepository.exists({ id: employee.id });

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee when it exists", async () => {
            const employee = generateHourlyEmployee();
            await mongoEmployeeRepository.insertOne(employee);

            await mongoEmployeeRepository.deleteById(employee.id);

            const result = await mongoEmployeeRepository.exists({ id: employee.id });
            expect(result).to.be.false;
        });
        it("throw a NotFoundError when the employee does not exists", async () => {
            // noinspection ES6MissingAwait
            const promise = mongoEmployeeRepository.deleteById(generateIndex());

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("updateById", () => {
        it("update the employee when it exists", async () => {
            const employee = await seedHourlyEmployee();

            await mongoEmployeeRepository.updateById(employee.id, { name: "James Bond" });

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.name).to.equal("James Bond");
        });
        it("throw a NotFoundError when the employee does not exists", async () => {
            // noinspection ES6MissingAwait
            const promise = mongoEmployeeRepository.updateById(generateIndex(), {
                name: "James Bond"
            });

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
});
