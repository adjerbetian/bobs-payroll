import { execute, expect } from "../test/e2eTest";
import { db } from "../src/db";

describe("Use Case 1: Add New Employee", () => {
    const employee = {
        id: 12345,
        name: "employee name",
        address: "55 Rue du Faubourg Saint-Honoré, 75008 Paris"
    };

    it("should add an employee with a hourly rate", async () => {
        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" H 2`
        );

        const dbEmployee = await db
            .collection("employees")
            .findOne({ id: employee.id });
        expect(dbEmployee).to.deep.equal(employee);
    });
});

async function executePayrollCommand(command: string): Promise<string> {
    return execute("node dist/index.js " + command);
}
