import { Then } from "cucumber";
import {
    CommissionedEmployee,
    dbEmployees,
    Employee,
    EmployeeType,
    HourlyEmployee,
    SalariedEmployee
} from "../../../core";
import { expect } from "../../../test/utils";
import { store } from "../../utils";

Then(/^(\w+) should( fully)? exist in the employee DB$/, async (name: string, isFullComparison: string | undefined) => {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.true;

    if (isFullComparison) {
        const dbEmployee = await fetchEmployeeByName(name);
        expect(dbEmployee).entity.to.equal(employee);
    }
});
Then(/^(\w+) should not exist in the employee DB$/, async (name: string) => {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.false;
});
// prettier-ignore
Then(/^(\w+) should have its (.+) set to (?:")?([^"]+)(?:")?$/, async (name: string, field: string, value: string) => {
    const employee = await fetchEmployeeByName(name);
    if (field === "name") return expect(employee.getName()).to.equal(value);
    if (field === "address") return expect(employee.getAddress()).to.equal(value);
    if (field === "hourly rate") return expect((employee as HourlyEmployee).getHourlyRate()).to.equal(parseFloat(value));
    if (field === "salary") return expect((employee as SalariedEmployee | CommissionedEmployee).getSalary()).to.equal(parseFloat(value));
    if (field === "commission rate") return expect((employee as CommissionedEmployee).getCommissionRate()).to.equal(parseFloat(value));

    throw new Error(`invalid field "${field}"`);
});
Then(/(\w+) should be of type (hourly|salaried|commissioned)/, async (name: string, type: string) => {
    const employee = await fetchEmployeeByName(name);
    return expect(employee.getType()).to.equal(buildExpectedType());

    function buildExpectedType(): string {
        if (type === "hourly") return EmployeeType.HOURLY;
        if (type === "salaried") return EmployeeType.SALARIED;
        if (type === "commissioned") return EmployeeType.COMMISSIONED;
        throw new Error("invalid type");
    }
});

async function fetchEmployeeByName(name: string): Promise<Employee> {
    const employee = store.employees.get(name);
    return await dbEmployees.fetch({ id: employee.getId() });
}
