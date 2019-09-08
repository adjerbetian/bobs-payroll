import { entityGenerators, expect, generateHourlyEmployee } from "@test/unit";
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
            const timeCard1 = entityGenerators.generateTimeCard();
            const timeCard2 = entityGenerators.generateTimeCard();

            const amount = employeeEntity.computePayAmount([timeCard1, timeCard2]);

            expect(amount).to.equal((timeCard1.getHours() + timeCard2.getHours()) * employee.work.hourlyRate);
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const timeCard = entityGenerators.generateTimeCard({ hours: 8 + 2 });

            const amount = employeeEntity.computePayAmount([timeCard]);

            expect(amount).to.equal((8 + 2 * 1.5) * employee.work.hourlyRate);
        });
    });
});
