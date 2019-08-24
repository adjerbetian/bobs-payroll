import { buildFakeEmployeeRepository, buildFakeServiceChargeRepository, Fake } from "../../../test/fakeBuilders";
import { generateServiceCharge, generateUnionEmployee } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { ServiceCharge } from "../entities";
import { NotFoundError, TransactionFormatError } from "../errors";
import { EmployeeRepository, ServiceChargeRepository } from "../repositories";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { Transaction } from "./Transactions";

describe("postServiceCharge", () => {
    let fakeServiceChargeRepository: Fake<ServiceChargeRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let postServiceCharge: Transaction;

    beforeEach(() => {
        fakeServiceChargeRepository = buildFakeServiceChargeRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        postServiceCharge = buildPostServiceChargeTransaction({
            serviceChargeRepository: fakeServiceChargeRepository,
            employeeRepository: fakeEmployeeRepository
        });

        fakeServiceChargeRepository.insertOne.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();
        fakeEmployeeRepository.fetchByMemberId.withArgs(serviceCharge.memberId).resolves(generateUnionEmployee());

        await postServiceChargeEntity(serviceCharge);

        expect(fakeServiceChargeRepository.insertOne).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a EmployeeTypeError if no union member with this if was found", async () => {
        const serviceCharge = generateServiceCharge();
        fakeEmployeeRepository.fetchByMemberId
            .withArgs(serviceCharge.memberId)
            .rejects(new NotFoundError("no union member found"));

        // noinspection ES6MissingAwait
        const promise = postServiceChargeEntity(serviceCharge);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should throw a TransactionFormatError if the amount is missing", async () => {
        const serviceCharge = generateServiceCharge();
        fakeEmployeeRepository.fetchByMemberId.withArgs(serviceCharge.memberId).resolves(generateUnionEmployee());

        // noinspection ES6MissingAwait
        const promise = postServiceCharge(`${serviceCharge.memberId}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "ServiceCharge");
    });

    async function postServiceChargeEntity(serviceCharge: ServiceCharge): Promise<void> {
        return postServiceCharge(`${serviceCharge.memberId}`, `${serviceCharge.amount}`);
    }
});
