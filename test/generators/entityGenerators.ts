import { buildTimeCard, buildUnionMember, TimeCard, TimeCardDBModel, UnionMember, UnionMemberDBModel } from "../../src";
import { dbModelGenerators } from "./dbModelGenerators";

export const entityGenerators = {
    generateTimeCard,
    generateUnionMember
};

function generateTimeCard(args: Partial<TimeCardDBModel> = {}): TimeCard {
    return buildTimeCard(dbModelGenerators.generateTimeCard(args));
}

function generateUnionMember(args: Partial<UnionMemberDBModel> = {}): UnionMember {
    return buildUnionMember(dbModelGenerators.generateUnionMember(args));
}
