import { TimeCard } from "@modules/core";
import { generators, seeders } from "@modules/core/test";
import { Given } from "cucumber";
import { dates, store, toFloat } from "../../utils";

Given(
    /^a( new)? time card(?: (\w+)?)? for (\w+)(?: of (\d+\.?\d*) hours on(?: the)? (.+))?$/,
    async (
        isNew: string | null,
        timeCardName: string | null,
        employeeName: string,
        hours: string | null,
        day: string | null
    ) => {
        const timeCard = await generateOrSeed();
        if (timeCardName) {
            store.timeCards.set(timeCardName, timeCard);
        }

        async function generateOrSeed(): Promise<TimeCard> {
            const employee = store.employees.get(employeeName);
            const partialTimeCard = {
                employeeId: employee.getId(),
                hours: toFloat(hours),
                date: (day && dates.get(day)) || undefined
            };
            if (isNew) return generators.generateTimeCard(partialTimeCard);
            else return seeders.seedTimeCard(partialTimeCard);
        }
    }
);
