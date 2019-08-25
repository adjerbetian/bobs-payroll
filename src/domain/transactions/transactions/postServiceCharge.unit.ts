import { buildFakeServiceChargeRepository, buildFakeUnionMemberRepository, Fake } from "../../../../test/fakeBuilders";
import { generateHourlyEmployee, generateServiceCharge, generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { NotFoundError, ServiceCharge, ServiceChargeRepository, UnionMemberRepository } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";

describe("postServiceCharge", () => {
    let fakeServiceChargeRepository: Fake<ServiceChargeRepository>;
    let fakeUnionMemberRepository: Fake<UnionMemberRepository>;
    let postServiceCharge: Transaction;

    beforeEach(() => {
        fakeServiceChargeRepository = buildFakeServiceChargeRepository();
        fakeUnionMemberRepository = buildFakeUnionMemberRepository();
        postServiceCharge = buildPostServiceChargeTransaction({
            serviceChargeRepository: fakeServiceChargeRepository,
            unionMemberRepository: fakeUnionMemberRepository
        });

        fakeServiceChargeRepository.insertOne.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();
        fakeUnionMemberRepository.fetchByMemberId.withArgs(serviceCharge.memberId).resolves(generateUnionMember());

        await postServiceChargeEntity(serviceCharge);

        expect(fakeServiceChargeRepository.insertOne).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a EmployeeTypeError if no union member with this if was found", async () => {
        const serviceCharge = generateServiceCharge();
        fakeUnionMemberRepository.fetchByMemberId
            .withArgs(serviceCharge.memberId)
            .rejects(new NotFoundError("no union member found"));

        const promise = postServiceChargeEntity(serviceCharge);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const serviceCharge = generateServiceCharge();
        fakeUnionMemberRepository.fetchByMemberId.withArgs(serviceCharge.memberId).resolves(generateHourlyEmployee());

        const promise = postServiceCharge(`${serviceCharge.memberId}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "ServiceCharge");
    });

    async function postServiceChargeEntity(serviceCharge: ServiceCharge): Promise<void> {
        return postServiceCharge(`${serviceCharge.memberId}`, `${serviceCharge.amount}`);
    }
});
