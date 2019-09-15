import { generators, expect } from "@test/unit";
import { HourlyEmployee } from "../Employee";

describe("entity HourlyEmployeeEntity", () => {
    let employee: HourlyEmployee;

    describe("computePayAmount", () => {
        beforeEach(() => {
            employee = generators.generateHourlyEmployee();
        });

        it("should sum the given time cards hours", () => {
            const timeCard1 = generators.generateTimeCard();
            const timeCard2 = generators.generateTimeCard();

            const amount = employee.computePayAmount([timeCard1, timeCard2]);

            expect(amount).to.equal((timeCard1.getHours() + timeCard2.getHours()) * employee.getHourlyRate());
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const timeCard = generators.generateTimeCard({ hours: 8 + 2 });

            const amount = employee.computePayAmount([timeCard]);

            expect(amount).to.equal((8 + 2 * 1.5) * employee.getHourlyRate());
        });
    });
});
