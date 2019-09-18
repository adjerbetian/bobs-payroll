import { generators, seeders, expect, generateIndex } from "@test/integration";
import { NotFoundError } from "../../domain";
import { dbUnionMembers } from "../collections";
import { makeMongoUnionMemberRepository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    let repository: ReturnType<typeof makeMongoUnionMemberRepository>;

    beforeEach(() => {
        repository = makeMongoUnionMemberRepository(dbUnionMembers);
    });

    describe("fetchByMemberId", () => {
        it("return the union member", async () => {
            const unionMember = await seeders.seedUnionMember();

            const result = await repository.fetchByMemberId(unionMember.getMemberId());

            expect(result).entity.to.equal(unionMember);
        });
        it("should throw a NotFoundError when not found", async () => {
            const promise = repository.fetchByMemberId(`non-existent-id`);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("fetchByEmployeeId", () => {
        it("return the union member", async () => {
            const unionMember = await seeders.seedUnionMember();

            const result = await repository.fetchByEmployeeId(unionMember.getEmployeeId());

            expect(result).entity.to.equal(unionMember);
        });
        it("should throw a NotFoundError when not found", async () => {
            const promise = repository.fetchByEmployeeId(generateIndex());

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insert", () => {
        it("should insert the given union member", async () => {
            const unionMember = generators.generateUnionMember();

            await repository.insert(unionMember);

            const insertedUnionMember = await repository.fetchByEmployeeId(unionMember.getEmployeeId());
            expect(insertedUnionMember).entity.to.equal(unionMember);
        });
    });
    describe("doesMemberIdExist", () => {
        it("should return true when the memberId", async () => {
            const unionMember = await seeders.seedUnionMember();

            const result = await repository.doesMemberIdExist(unionMember.getMemberId());

            expect(result).to.be.true;
        });
        it("should return false when the union member does not exists", async () => {
            await seeders.seedUnionMember();

            const result = await repository.doesMemberIdExist(`non-existent-id`);

            expect(result).to.be.false;
        });
    });
    describe("deleteByEmployeeId", () => {
        it("should delete the employee's union members", async () => {
            const unionMember = await seeders.seedUnionMember();

            await repository.deleteByEmployeeId(unionMember.getEmployeeId());

            const wasDeleted = await repository.doesMemberIdExist(unionMember.getMemberId());
            expect(wasDeleted).to.be.false;
        });
    });
});
