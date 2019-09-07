import { expect, generateHourlyEmployee } from "@test/unit";
import { generateTimeCard } from "@test/utils";
import { HourlyEmployee } from "./HourlyEmployee";
import { buildHourlyEmployeeEntity, HourlyEmployeeEntity } from "./HourlyEmployeeEntity";

describe("entity HourlyEmployeeEntity", () => {
    let employee: HourlyEmployee;
    let employeeEntity: HourlyEmployeeEntity;

    describe("computePayAmount", () => {
        beforeEach(() => {
            employee = generateHourlyEmployee();
            employeeEntity = buildHourlyEmployeeEntity(employee);
        });

        it("should sum the given time cards hours", () => {
            const timeCard1 = generateTimeCard();
            const timeCard2 = generateTimeCard();

            const amount = employeeEntity.computePayAmount([timeCard1, timeCard2]);

            expect(amount).to.equal((timeCard1.hours + timeCard2.hours) * employee.work.hourlyRate);
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const timeCard = generateTimeCard({ hours: 8 + 2 });

            const amount = employeeEntity.computePayAmount([timeCard]);

            expect(amount).to.equal((8 + 2 * 1.5) * employee.work.hourlyRate);
        });
    });
});
