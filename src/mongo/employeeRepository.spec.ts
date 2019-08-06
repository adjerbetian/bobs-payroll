import { generateHourlyRateEmployee } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateIndex } from "../../test/utils";
import { NotFoundError } from "../errors";
import { employeeRepository } from "./employeeRepository";

describe("employeeRepository", () => {
    describe("fetchEmployeeById", () => {
        it("should return the employee", async () => {
            const employee = generateHourlyRateEmployee();
            await employeeRepository.insertOne(employee);

            const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);

            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should not return the _id field", async () => {
            const employee = generateHourlyRateEmployee();
            await employeeRepository.insertOne(employee);

            const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);

            expect(dbEmployee).not.to.have.property("_id");
        });
        it("should throw a not found error when the employee was not found", async () => {
            // noinspection ES6MissingAwait
            const promise = employeeRepository.fetchEmployeeById(1234);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insertOne", () => {
        it("insert the given employee", async () => {
            const employee = generateHourlyRateEmployee();

            await employeeRepository.insertOne(employee);

            const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
        it("should not add the _id field to the entity", async () => {
            const employee = generateHourlyRateEmployee();

            await employeeRepository.insertOne(employee);

            expect(employee).not.to.have.property("_id");
        });
    });
    describe("exists", () => {
        it("return true when the employee exists", async () => {
            const employee = generateHourlyRateEmployee();
            await employeeRepository.insertOne(employee);

            const result = await employeeRepository.exists({ id: employee.id });

            expect(result).to.be.true;
        });
        it("return false when the employee exists", async () => {
            const employee = generateHourlyRateEmployee();

            const result = await employeeRepository.exists({ id: employee.id });

            expect(result).to.be.false;
        });
    });
    describe("deleteById", () => {
        it("delete the employee when it exists", async () => {
            const employee = generateHourlyRateEmployee();
            await employeeRepository.insertOne(employee);

            await employeeRepository.deleteById(employee.id);

            const result = await employeeRepository.exists({ id: employee.id });
            expect(result).to.be.false;
        });
        it("throw a NotFoundError when the employee does not exists", async () => {
            // noinspection ES6MissingAwait
            const promise = employeeRepository.deleteById(generateIndex());

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
});
