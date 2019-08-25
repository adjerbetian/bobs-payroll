import { generateUnionMember } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { mongoUnionMemberRepository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    describe("insert", () => {
        it("insert the given time card", async () => {
            const unionMember = generateUnionMember();

            await mongoUnionMemberRepository.insert(unionMember);

            const dbUnionMember = await mongoUnionMemberRepository.fetchByMemberId(unionMember.memberId);
            expect(dbUnionMember).to.deep.equal(unionMember);
        });
        it("should not add the _id field to the entity", async () => {
            const unionMember = generateUnionMember();

            await mongoUnionMemberRepository.insert(unionMember);

            expect(unionMember).not.to.have.property("_id");
        });
    });
});
