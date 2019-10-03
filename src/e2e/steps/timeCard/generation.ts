import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { TimeCard } from "../../../app";
import { dates, store, toFloat } from "../../utils";

Given(
    /^a( new)? time card(?: (\w+)?)? for (\w+)(?: of (\d+\.?\d*) hours on (.+))?$/,
    async (
        isNew: string | undefined,
        timeCardName: string | undefined,
        employeeName: string,
        hours: string | undefined,
        day: string | undefined
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
                date: day && dates.get(day)
            };
            if (isNew) return generators.generateTimeCard(partialTimeCard);
            else return seeders.seedTimeCard(partialTimeCard);
        }
    }
);
