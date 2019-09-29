import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { Employee } from "../../app";
import { store } from "../utils";

Given("a new {string} employee {string}", (type: string, name: string) => {
    store.employees.set(name, generateEmployee());

    function generateEmployee(): Employee {
        if (type === "hourly") return generators.generateHourlyEmployee({ name: name });
        if (type === "salaried") return generators.generateSalariedEmployee({ name: name });
        if (type === "commissioned") return generators.generateSalariedEmployee({ name: name });
        throw new Error("invalid type");
    }
});
Given("a(n) {string} employee {string}", async (type: string, name: string) => {
    store.employees.set(name, await seedEmployee());

    async function seedEmployee(): Promise<Employee> {
        if (type === "hourly") return seeders.seedHourlyEmployee({ name: name });
        if (type === "salaried") return seeders.seedSalariedEmployee({ name: name });
        if (type === "commissioned") return seeders.seedCommissionedEmployee({ name: name });
        throw new Error("invalid type");
    }
});
Given("an employee {string}", async (name: string) => {
    store.employees.set(name, await seeders.seedHourlyEmployee({ name: name }));
});
Given("a new time card {string} for {string}", async (timeCardName: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const timeCard = generators.generateTimeCard({ employeeId: employee.getId() });
    store.timeCards.set(timeCardName, timeCard);
});
Given("a new sales receipt {string} for {string}", async (salesReceiptName: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const salesReceipt = generators.generateSalesReceipt({ employeeId: employee.getId() });
    store.salesReceipts.set(salesReceiptName, salesReceipt);
});
Given("a union membership for {string}", async (employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const unionMember = await seeders.seedUnionMember({ employeeId: employee.getId() });
    store.unionMembers.set(employeeName, unionMember);
});
Given("a new union membership for {string}", (employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const unionMember = generators.generateUnionMember({ employeeId: employee.getId() });
    store.unionMembers.set(employeeName, unionMember);
});
Given("a new service charge {string} for {string}", async (serviceChargeName: string, employeeName: string) => {
    const unionMember = store.unionMembers.get(employeeName);

    const serviceCharge = generators.generateServiceCharge({ memberId: unionMember.getMemberId() });
    store.serviceCharges.set(serviceChargeName, serviceCharge);
});
