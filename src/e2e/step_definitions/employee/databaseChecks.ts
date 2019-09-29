import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbEmployees, Employee, EmployeeType } from "../../../app";
import { store } from "../../utils";

Then("{string} should fully exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const dbEmployee = await fetchEmployeeByName(name);
    expect(dbEmployee).entity.to.equal(employee);
});
Then("{string} should (still )not exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.false;
});
Then("{string} should (still )exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.true;
});
Then("{string} should have its {string} set to {string}", async (name: string, field: string, value: string) => {
    const employee = await fetchEmployeeByName(name);
    if (field === "name") {
        return expect(employee.getName()).to.equal(value);
    }
    if (field === "address") {
        return expect(employee.getAddress()).to.equal(value);
    }
    throw new Error("invalid field");
});
Then("{string} should be of type {string}", async (name: string, type: string) => {
    const employee = await fetchEmployeeByName(name);
    return expect(employee.getType()).to.equal(buildExpectedType());

    function buildExpectedType(): string {
        if (type === "hourly") return EmployeeType.HOURLY;
        if (type === "salaried") return EmployeeType.SALARIED;
        if (type === "commissioned") return EmployeeType.COMMISSIONED;
        throw new Error("invalid type");
    }
});
Then("{string} should have an hourly rate of {float}", async (name: string, hourlyRate: number) => {
    const employee = await fetchEmployeeByName(name);
    if (!employee.hasType(EmployeeType.HOURLY)) throw new Error(`expected "${name}" to be an hourly employee`);

    expect(employee.getHourlyRate()).to.equal(hourlyRate);
});

async function fetchEmployeeByName(name: string): Promise<Employee> {
    const employee = store.employees.get(name);
    return await dbEmployees.fetch({ id: employee.getId() });
}
