import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateServiceCharge } from "../../test/generators";
import { serviceChargeRepository } from "./serviceChargeRepository";
import { dbServiceCharge } from "./db";
import { cloneDeep } from "lodash";
import { ServiceCharge } from "../entities/ServiceCharge";

describe("serviceChargeRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's service charges", async () => {
            const salesReceipt = await dbGenerateServiceCharge();

            const salesReceipts = await serviceChargeRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' time cards", async () => {
            const salesReceipt = await dbGenerateServiceCharge();

            const salesReceipts = await serviceChargeRepository.fetchAllOfEmployee(
                salesReceipt.employeeId + 1
            );

            expect(salesReceipts).to.be.empty;
        });

        async function dbGenerateServiceCharge(): Promise<ServiceCharge> {
            const serviceCharge = generateServiceCharge();
            await dbServiceCharge.insertOne(cloneDeep(serviceCharge));
            return serviceCharge;
        }
    });
    describe("insertOne", () => {
        it("insert the given service charge", async () => {
            const serviceCharge = generateServiceCharge();

            await serviceChargeRepository.insertOne(serviceCharge);

            const dbServiceCharges = await serviceChargeRepository.fetchAllOfEmployee(
                serviceCharge.employeeId
            );
            expect(dbServiceCharges).to.deep.equal([serviceCharge]);
        });
        it("should not add the _id field to the entity", async () => {
            const serviceCharge = generateServiceCharge();

            await serviceChargeRepository.insertOne(serviceCharge);

            expect(serviceCharge).not.to.have.property("_id");
        });
    });
});
