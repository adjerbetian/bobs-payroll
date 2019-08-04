import "../test/integrationTest";
import { expect } from "../test/unitTest";
import { db } from "./db";
import { ObjectID } from "bson";
import { addEmployee } from "./addEmployee";

describe("addEmployee", () => {
    it("should work", async () => {
        const employee = {
            id: 12345,
            name: "employee name",
            address: "55 Rue du Faubourg Saint-Honoré, 75008 Paris"
        };

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "H",
            `${2}`
        );

        const dbEmployee = await fetchEmployee(employee.id);
        expect(dbEmployee).to.deep.equal({
            id: employee.id,
            name: employee.name,
            address: employee.address,
            rateType: "hourly",
            rate: 2
        });
    });
});

async function fetchEmployee(id: number): Promise<DBEmployee | null> {
    return await db.collection("employees").findOne({ id });
}

interface DBEmployee {
    _id: ObjectID;
    id: number;
    name: string;
    address: string;
    rateType: string;
    rate: number;
}
