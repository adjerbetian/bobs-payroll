import {
    buildFakeEmployeeRepository,
    buildFakeServiceChargeRepository,
    Fake
} from "../../../test/fakeBuilders";
import {
    generateHourlyRateEmployee,
    generateServiceCharge,
    generateUnionEmployee
} from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { ServiceCharge } from "../entities";
import { TransactionFormatError, UnionMemberError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { Transaction } from "./Transactions";

describe("postServiceCharge", () => {
    let fakeServiceChargeRepository: Fake<TimeCardRepository>;
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
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(serviceCharge.employeeId)
            .resolves(generateUnionEmployee());

        await postServiceChargeEntity(serviceCharge);

        expect(fakeServiceChargeRepository.insertOne).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a EmployeeTypeError if the employee is not a union member", async () => {
        const serviceCharge = generateServiceCharge();
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(serviceCharge.employeeId)
            .resolves(generateHourlyRateEmployee());

        // noinspection ES6MissingAwait
        const promise = postServiceChargeEntity(serviceCharge);

        await expect(promise).to.be.rejectedWith(UnionMemberError);
    });
    it.skip("should throw a TransactionFormatError if the amount is missing", async () => {
        const serviceCharge = generateServiceCharge();
        fakeEmployeeRepository.fetchEmployeeById
            .withArgs(serviceCharge.employeeId)
            .resolves(generateUnionEmployee());

        // noinspection ES6MissingAwait
        const promise = postServiceCharge(`${serviceCharge.employeeId}`, ``);

        await expect(promise).to.be.rejectedWith(TransactionFormatError);
    });

    async function postServiceChargeEntity(serviceCharge: ServiceCharge): Promise<void> {
        return postServiceCharge(`${serviceCharge.employeeId}`, `${serviceCharge.amount}`);
    }
});
