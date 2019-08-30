import { buildStubMongoDbAdapter, Stub } from "../../../test/stubBuilders";
import { generateIndex, generateUnionMember } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { UnionMember, UnionMemberRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoUnionMemberRepository } from "./mongoUnionMemberRepository";

describe("mongoUnionMemberRepository", () => {
    let repository: UnionMemberRepository;
    let stubDb: Stub<MongoDbAdapter<UnionMember>>;

    beforeEach(() => {
        stubDb = buildStubMongoDbAdapter();
        repository = buildMongoUnionMemberRepository(stubDb);
    });

    describe("fetchByMemberId", () => {
        it("return the union member", async () => {
            const memberId = `member-${generateIndex()}`;
            const unionMember = generateUnionMember({ memberId });
            stubDb.fetch.withArgs({ memberId }).resolves(unionMember);

            const result = await repository.fetchByMemberId(memberId);

            expect(result).to.deep.equal(unionMember);
        });
    });
    describe("fetchByEmployeeId", () => {
        it("return the union member", async () => {
            const employeeId = generateIndex();
            const unionMember = generateUnionMember({ employeeId });
            stubDb.fetch.withArgs({ employeeId }).resolves(unionMember);

            const result = await repository.fetchByEmployeeId(employeeId);

            expect(result).to.deep.equal(unionMember);
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const unionMember = generateUnionMember();
            stubDb.insert.resolves();

            await repository.insert(unionMember);

            expect(stubDb.insert).to.have.been.calledOnceWith(unionMember);
        });
    });
    describe("exists", () => {
        it("should return true when the union member exists", async () => {
            const query = { memberId: "memberId", employeeId: generateIndex() };
            stubDb.exists.withArgs(query).resolves(true);

            const result = await repository.exists(query);

            expect(result).to.be.true;
        });
        it("should return false when the union member does not exists", async () => {
            const query = { memberId: "memberId", employeeId: generateIndex() };
            stubDb.exists.withArgs(query).resolves(false);

            const result = await repository.exists(query);

            expect(result).to.be.false;
        });
    });
    describe("deleteByEmployeeId", () => {
        it("should delete the employee's union members", async () => {
            const employeeId = generateIndex();
            stubDb.remove.resolves();

            await repository.deleteByEmployeeId(employeeId);

            expect(stubDb.remove).to.have.been.calledOnceWith({ employeeId });
        });
    });
});
