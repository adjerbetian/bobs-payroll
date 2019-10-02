import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbTimeCards } from "../../../app";
import { store } from "../../utils";

Then(
    /^(\w+) should( not)? have the time card (\w+)$/,
    async (employeeName: string, isNegated: string | undefined, timeCardName: string) => {
        const employee = store.employees.get(employeeName);
        const timeCard = store.timeCards.get(timeCardName);

        const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
        if (isNegated) {
            expect(timeCardsInDB).entities.not.to.include(timeCard);
        } else {
            expect(timeCardsInDB).entities.to.include(timeCard);
        }
    }
);
