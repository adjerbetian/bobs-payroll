import { expect, generateIndex, generateUnionMember, Stub } from "@test/unit";
import { UnionMember } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildStubbedMongoDbAdapter } from "../test";
import { buildMongoUnionMemberRepository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<UnionMember>>;
    let repository: ReturnType<typeof buildMongoUnionMemberRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = buildMongoUnionMemberRepository(stubbedDb);
    });

    describe("fetchByMemberId", () => {
        it("return the union member", async () => {
            const memberId = `member-${generateIndex()}`;
            const unionMember = generateUnionMember({ memberId });
            stubbedDb.fetch.withArgs({ memberId }).resolves(unionMember);

            const result = await repository.fetchByMemberId(memberId);

            expect(result).to.deep.equal(unionMember);
        });
    });
    describe("fetchByEmployeeId", () => {
        it("return the union member", async () => {
            const employeeId = generateIndex();
            const unionMember = generateUnionMember({ employeeId });
            stubbedDb.fetch.withArgs({ employeeId }).resolves(unionMember);

            const result = await repository.fetchByEmployeeId(employeeId);

            expect(result).to.deep.equal(unionMember);
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const unionMember = generateUnionMember();
            stubbedDb.insert.resolves();

            await repository.insert(unionMember);

            expect(stubbedDb.insert).to.have.been.calledOnceWith(unionMember);
        });
    });
    describe("exists", () => {
        it("should return true when the union member exists", async () => {
            const query = { memberId: "memberId", employeeId: generateIndex() };
            stubbedDb.exists.withArgs(query).resolves(true);

            const result = await repository.exists(query);

            expect(result).to.be.true;
        });
        it("should return false when the union member does not exists", async () => {
            const query = { memberId: "memberId", employeeId: generateIndex() };
            stubbedDb.exists.withArgs(query).resolves(false);

            const result = await repository.exists(query);

            expect(result).to.be.false;
        });
    });
    describe("deleteByEmployeeId", () => {
        it("should delete the employee's union members", async () => {
            const employeeId = generateIndex();
            stubbedDb.remove.resolves();

            await repository.deleteByEmployeeId(employeeId);

            expect(stubbedDb.remove).to.have.been.calledOnceWith({ employeeId });
        });
    });
});
