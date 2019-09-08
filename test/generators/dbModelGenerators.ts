import * as moment from "moment";
import { TimeCardDBModel, UnionMemberDBModel } from "../../src";
import { generateFloatBetween, generateIndex } from "./common";

export const dbModelGenerators = {
    generateTimeCard,
    generateUnionMember
};

function generateTimeCard(args: Partial<TimeCardDBModel> = {}): TimeCardDBModel {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        hours: generateFloatBetween(2, 8),
        ...args
    };
}

function generateUnionMember(args: Partial<UnionMemberDBModel> = {}): UnionMemberDBModel {
    return {
        employeeId: generateIndex(),
        memberId: `member-${generateIndex()}`,
        rate: generateFloatBetween(0, 0.1),
        ...args
    };
}
