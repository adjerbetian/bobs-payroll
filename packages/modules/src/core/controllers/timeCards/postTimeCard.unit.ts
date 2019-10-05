import { generators, expect, Stub } from "../../../test/unit";
import * as moment from "moment";
import { CoreUseCases, TimeCard, TimeCardCreationModel } from "../../domain";
import { RouteFormatError } from "../errors";
import { buildStubbedCoreUseCases } from "../test";
import { makePostTimeCardController } from "./postTimeCard";

describe("postTimeCard", () => {
    let stubbedUseCases: Stub<CoreUseCases>;
    let postTimeCard: ReturnType<typeof makePostTimeCardController>;

    beforeEach(() => {
        stubbedUseCases = buildStubbedCoreUseCases();
        postTimeCard = makePostTimeCardController(stubbedUseCases);
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generators.generateTimeCard();
        stubbedUseCases.createTimeCard.resolves();

        await postTimeCardEntity(timeCard);

        const requestModel: TimeCardCreationModel = {
            employeeId: timeCard.getEmployeeId(),
            hours: timeCard.getHours(),
            date: timeCard.getDate()
        };
        expect(stubbedUseCases.createTimeCard).to.have.been.calledOnceWith(requestModel);
    });
    it("should throw a RouteFormatError if the date is not in good format", async () => {
        const timeCard = generators.generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        stubbedUseCases.createTimeCard.resolves();

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.getEmployeeId()}`, `${timeCard.getDate()}`, `${timeCard.getHours()}`);
    }
});
