import { generators, expect, Stub } from "@test/unit";
import * as moment from "moment";
import { RouteFormatError } from "../../../../router";
import { CoreActions, TimeCard, TimeCardCreationModel } from "../../domain";
import { buildStubbedCoreActions } from "../test";
import { makePostTimeCardController } from "./postTimeCard";

describe("postTimeCard", () => {
    let stubbedActions: Stub<CoreActions>;
    let postTimeCard: ReturnType<typeof makePostTimeCardController>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postTimeCard = makePostTimeCardController(stubbedActions);
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generators.generateTimeCard();
        stubbedActions.createTimeCard.resolves();

        await postTimeCardEntity(timeCard);

        const requestModel: TimeCardCreationModel = {
            employeeId: timeCard.getEmployeeId(),
            hours: timeCard.getHours(),
            date: timeCard.getDate()
        };
        expect(stubbedActions.createTimeCard).to.have.been.calledOnceWith(requestModel);
    });
    it("should throw a RouteFormatError if the date is not in good format", async () => {
        const timeCard = generators.generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        stubbedActions.createTimeCard.resolves();

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.getEmployeeId()}`, `${timeCard.getDate()}`, `${timeCard.getHours()}`);
    }
});