import { generators, seeders, expect, generateIndex } from "../../../test/integration";
import { NotFoundError } from "../../domain";
import { dbUnionMembers } from "../collections";
import { makeMongoUnionMembershipRepository } from "./mongoUnionMembershipRepository";

describe("mongoUnionMembershipRepository", () => {
    let repository: ReturnType<typeof makeMongoUnionMembershipRepository>;

    beforeEach(() => {
        repository = makeMongoUnionMembershipRepository(dbUnionMembers);
    });

    describe("fetchByMemberId", () => {
        it("return the union membership", async () => {
            const unionMembership = await seeders.seedUnionMembership();

            const result = await repository.fetchByMemberId(unionMembership.getMemberId());

            expect(result).entity.to.equal(unionMembership);
        });
        it("should throw a NotFoundError when not found", async () => {
            const promise = repository.fetchByMemberId(`non-existent-id`);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("fetchByEmployeeId", () => {
        it("return the union membership", async () => {
            const unionMembership = await seeders.seedUnionMembership();

            const result = await repository.fetchByEmployeeId(unionMembership.getEmployeeId());

            expect(result).entity.to.equal(unionMembership);
        });
        it("should throw a NotFoundError when not found", async () => {
            const promise = repository.fetchByEmployeeId(generateIndex());

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insert", () => {
        it("should insert the given union membership", async () => {
            const unionMembership = generators.generateUnionMembership();

            await repository.insert(unionMembership);

            const insertedUnionMembership = await repository.fetchByEmployeeId(unionMembership.getEmployeeId());
            expect(insertedUnionMembership).entity.to.equal(unionMembership);
        });
    });
    describe("doesMemberIdExist", () => {
        it("should return true when the memberId", async () => {
            const unionMembership = await seeders.seedUnionMembership();

            const result = await repository.doesMemberIdExist(unionMembership.getMemberId());

            expect(result).to.be.true;
        });
        it("should return false when the union membership does not exists", async () => {
            await seeders.seedUnionMembership();

            const result = await repository.doesMemberIdExist(`non-existent-id`);

            expect(result).to.be.false;
        });
    });
    describe("deleteByEmployeeId", () => {
        it("should delete the employee's union members", async () => {
            const unionMembership = await seeders.seedUnionMembership();

            await repository.deleteByEmployeeId(unionMembership.getEmployeeId());

            const wasDeleted = await repository.doesMemberIdExist(unionMembership.getMemberId());
            expect(wasDeleted).to.be.false;
        });
    });
});
