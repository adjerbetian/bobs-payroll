import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbEmployees, dbSalesReceipts, dbServiceCharges, dbTimeCards } from "../../app";
import { store } from "../utils";

// Employee
Then("{string} should fully exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const dbEmployee = await dbEmployees.fetch({ id: employee.getId() });
    expect(dbEmployee).entity.to.equal(employee);
});
Then("{string} should not exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.false;
});
Then("{string} should (still) exist in the employee DB", async (name: string) => {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.true;
});

// TimeCard
Then("{string} should have the time card {string}", async (employeeName: string, timeCardName: string) => {
    const employee = store.employees.get(employeeName);
    const timeCard = store.timeCards.get(timeCardName);

    const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
    expect(timeCardsInDB).entities.to.include(timeCard);
});
Then("{string} should not have the time card {string}", async (employeeName: string, timeCardName: string) => {
    const employee = store.employees.get(employeeName);
    const timeCard = store.timeCards.get(timeCardName);

    const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
    expect(timeCardsInDB).entities.not.to.include(timeCard);
});

// SalesReceipt
Then("{string} should have the sales receipt {string}", async (employeeName: string, salesReceiptName: string) => {
    const employee = store.employees.get(employeeName);
    const salesReceipt = store.salesReceipts.get(salesReceiptName);

    const salesReceiptsInDB = await dbSalesReceipts.fetchAll({ employeeId: employee.getId() });
    expect(salesReceiptsInDB).entities.to.include(salesReceipt);
});
Then("{string} should not have the sales receipt {string}", async (employeeName: string, salesReceiptName: string) => {
    const employee = store.employees.get(employeeName);
    const salesReceipt = store.salesReceipts.get(salesReceiptName);

    const salesReceiptsInDB = await dbSalesReceipts.fetchAll({ employeeId: employee.getId() });
    expect(salesReceiptsInDB).entities.not.to.include(salesReceipt);
});
Then("{string} should have the service charge {string}", async (employeeName: string, serviceChargeName: string) => {
    const unionMember = store.unionMembers.get(employeeName);
    const serviceCharge = store.serviceCharges.get(serviceChargeName);

    const serviceChargesInDB = await dbServiceCharges.fetchAll({ memberId: unionMember.getMemberId() });
    expect(serviceChargesInDB).entities.to.include(serviceCharge);
});
Then(
    "{string} should not have the service charge {string}",
    async (employeeName: string, serviceChargeName: string) => {
        const unionMember = store.unionMembers.get(employeeName);
        const serviceCharge = store.serviceCharges.get(serviceChargeName);

        const serviceChargesInDB = await dbServiceCharges.fetchAll({ memberId: unionMember.getMemberId() });
        expect(serviceChargesInDB).entities.not.to.include(serviceCharge);
    }
);
