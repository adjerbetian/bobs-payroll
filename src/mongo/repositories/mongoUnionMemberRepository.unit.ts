import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateUnionMember } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { generateIndex } from "../../../test/utils";
import { UnionMember, UnionMemberRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoUnionMemberRepository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    let repository: UnionMemberRepository;
    let fakeDb: Fake<MongoDbAdapter<UnionMember>>;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoUnionMemberRepository(fakeDb);
    });

    describe("fetchByMemberId", () => {
        it("return the union member", async () => {
            const memberId = `member-${generateIndex()}`;
            const unionMember = generateUnionMember({ memberId });
            fakeDb.fetch.withArgs({ memberId }).resolves(unionMember);

            const result = await repository.fetchByMemberId(memberId);

            expect(result).to.deep.equal(unionMember);
        });
    });
    describe("fetchByEmployeeId", () => {
        it("return the union member", async () => {
            const employeeId = generateIndex();
            const unionMember = generateUnionMember({ employeeId });
            fakeDb.fetch.withArgs({ employeeId }).resolves(unionMember);

            const result = await repository.fetchByEmployeeId(employeeId);

            expect(result).to.deep.equal(unionMember);
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const unionMember = generateUnionMember();
            fakeDb.insert.resolves();

            await repository.insert(unionMember);

            expect(fakeDb.insert).to.have.been.calledOnceWith(unionMember);
        });
    });
    describe("exists", () => {
        it("should return true when the union member exists", async () => {
            const query = { memberId: "memberId", employeeId: generateIndex() };
            fakeDb.exists.withArgs(query).resolves(true);

            const result = await repository.exists(query);

            expect(result).to.be.true;
        });
        it("should return false when the union member does not exists", async () => {
            const query = { memberId: "memberId", employeeId: generateIndex() };
            fakeDb.exists.withArgs(query).resolves(false);

            const result = await repository.exists(query);

            expect(result).to.be.false;
        });
    });
    describe("deleteByEmployeeId", () => {
        it("should delete the employee's union members", async () => {
            const employeeId = generateIndex();
            fakeDb.remove.resolves();

            await repository.deleteByEmployeeId(employeeId);

            expect(fakeDb.remove).to.have.been.calledOnceWith({ employeeId });
        });
    });
});
