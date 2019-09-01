import { expect, generateIndex, generateTimeCard, monday, Stub } from "@test/unit";
import { TimeCardRepository } from "../../repositories";
import { buildStubbedTimeCardRepository } from "../../test";
import { buildFetchEmployeeTimeCardsSince } from "./fetchAllOfEmployeeSince";

describe("action fetchAllOfEmployeeSince", () => {
    let stubbedTimeCardRepository: Stub<TimeCardRepository>;
    let fetchEmployeeTimeCardsSince: ReturnType<typeof buildFetchEmployeeTimeCardsSince>;

    beforeEach(() => {
        stubbedTimeCardRepository = buildStubbedTimeCardRepository();
        fetchEmployeeTimeCardsSince = buildFetchEmployeeTimeCardsSince({
            timeCardRepository: stubbedTimeCardRepository
        });
    });

    it("should return the time cards", async () => {
        const timeCards = [generateTimeCard(), generateTimeCard()];
        const employeeId = generateIndex();
        stubbedTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employeeId, monday).resolves(timeCards);

        const result = await fetchEmployeeTimeCardsSince(employeeId, monday);

        expect(result).to.deep.equal(timeCards);
    });
});
