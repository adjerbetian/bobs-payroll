import { generateUnionMember } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { mongoUnionMemberRepository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    describe("insertOne", () => {
        it("insert the given time card", async () => {
            const unionMember = generateUnionMember();

            await mongoUnionMemberRepository.insertOne(unionMember);

            const dbUnionMember = await mongoUnionMemberRepository.fetchByMemberId(unionMember.memberId);
            expect(dbUnionMember).to.deep.equal(unionMember);
        });
        it("should not add the _id field to the entity", async () => {
            const unionMember = generateUnionMember();

            await mongoUnionMemberRepository.insertOne(unionMember);

            expect(unionMember).not.to.have.property("_id");
        });
    });
});
