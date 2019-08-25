import { generateUnionMember } from "../../../test/generators";
import "../../../test/integrationTest";
import { expect } from "../../../test/unitTest";
import { dbUnionMembers as db } from "../db";
import { mongoUnionMemberRepository as repository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    describe("insert", () => {
        it("insert the given time card", async () => {
            const unionMember = generateUnionMember();

            await repository.insert(unionMember);

            const dbUnionMember = await db.fetch({ memberId: unionMember.memberId });
            expect(dbUnionMember).to.deep.equal(unionMember);
        });
        it("should not add the _id field to the entity", async () => {
            const unionMember = generateUnionMember();

            await repository.insert(unionMember);

            expect(unionMember).not.to.have.property("_id");
        });
    });
});
