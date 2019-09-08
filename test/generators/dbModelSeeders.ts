import { dbTimeCards, dbUnionMembers, TimeCardDBModel, UnionMemberDBModel } from "../../src";
import { dbModelGenerators } from "./dbModelGenerators";

export const dbModelSeeders = {
    seedUnionMember,
    seedTimeCard
};

async function seedUnionMember(args: Partial<UnionMemberDBModel> = {}): Promise<UnionMemberDBModel> {
    const unionMember = dbModelGenerators.generateUnionMember(args);
    await dbUnionMembers.insert(unionMember);
    return unionMember;
}

async function seedTimeCard(args: Partial<TimeCardDBModel> = {}): Promise<TimeCardDBModel> {
    const timeCard = dbModelGenerators.generateTimeCard(args);
    await dbTimeCards.insert(timeCard);
    return timeCard;
}
