import { expect } from "@payroll/test";
import { generators } from "../../../test";

describe("entity HourlyEmployeeEntity", () => {
    describe("computePayAmount", () => {
        it("should sum the given time cards hours", () => {
            const employee = generators.generateHourlyEmployee({ hourlyRate: 15 });
            const timeCard1 = generators.generateTimeCard({ hours: 4 });
            const timeCard2 = generators.generateTimeCard({ hours: 5 });

            const amount = employee.computePayAmount([timeCard1, timeCard2]);

            expect(amount).to.equal((4 + 5) * 15);
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const employee = generators.generateHourlyEmployee({ hourlyRate: 15 });
            const timeCard = generators.generateTimeCard({ hours: 8 + 2 });

            const amount = employee.computePayAmount([timeCard]);

            expect(amount).to.equal((8 + 2 * 1.5) * 15);
        });
    });
});
