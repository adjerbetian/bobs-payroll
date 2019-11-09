import { dbTimeCards } from "@modules/core";
import { expect } from "@infra/test";
import { Then } from "cucumber";
import { store } from "../../utils";

// noinspection DuplicatedCode
Then(
    /^(\w+) should( not)? have the time card (\w+)$/,
    async (employeeName: string, isNegated: string | null, timeCardName: string) => {
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
