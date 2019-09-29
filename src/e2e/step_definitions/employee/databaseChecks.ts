import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbEmployees } from "../../../app";
import { store } from "../../utils";

Then("{string} should fully exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const dbEmployee = await dbEmployees.fetch({ id: employee.getId() });
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
