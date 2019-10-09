import { clean } from "@payroll/common";
import { EntityGenerator, generateFloatBetween, generateIndex } from "@payroll/test";
import * as moment from "moment";
import {
    buildCommissionedEmployee,
    buildDirectPaymentMethod,
    buildHoldPaymentMethod,
    buildHourlyEmployee,
    buildMailPaymentMethod,
    buildSalariedEmployee,
    buildSalesReceipt,
    buildServiceCharge,
    buildTimeCard,
    buildUnionMembership
} from "../domain";

interface Generators {
    generateTimeCard: EntityGenerator<typeof buildTimeCard>;
    generateUnionMembership: EntityGenerator<typeof buildUnionMembership>;
    generateHourlyEmployee: EntityGenerator<typeof buildHourlyEmployee>;
    generateSalariedEmployee: EntityGenerator<typeof buildSalariedEmployee>;
    generateCommissionedEmployee: EntityGenerator<typeof buildCommissionedEmployee>;
    generateSalesReceipt: EntityGenerator<typeof buildSalesReceipt>;
    generateServiceCharge: EntityGenerator<typeof buildServiceCharge>;
    generateHoldPaymentMethod: EntityGenerator<typeof buildHoldPaymentMethod>;
    generateDirectPaymentMethod: EntityGenerator<typeof buildDirectPaymentMethod>;
    generateMailPaymentMethod: EntityGenerator<typeof buildMailPaymentMethod>;
}

export const generators: Generators = {
    generateTimeCard(args = {}) {
        const index = generateIndex();
        return buildTimeCard({
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            hours: generateFloatBetween(2, 8),
            ...clean(args)
        });
    },
    generateUnionMembership(args = {}) {
        return buildUnionMembership({
            employeeId: generateIndex(),
            memberId: `member-${generateIndex()}`,
            rate: generateFloatBetween(0, 0.1),
            ...clean(args)
        });
    },
    generateHourlyEmployee(args = {}) {
        const index = generateIndex();
        return buildHourlyEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            hourlyRate: generateFloatBetween(10, 20),
            ...clean(args)
        });
    },
    generateSalariedEmployee(args = {}) {
        const index = generateIndex();
        return buildSalariedEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            ...clean(args)
        });
    },
    generateCommissionedEmployee(args = {}) {
        const index = generateIndex();
        return buildCommissionedEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            commissionRate: generateFloatBetween(0, 0.1),
            ...clean(args)
        });
    },
    generateSalesReceipt(args = {}) {
        const index = generateIndex();
        return buildSalesReceipt({
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            amount: generateFloatBetween(10000, 50000),
            ...clean(args)
        });
    },
    generateServiceCharge(args = {}) {
        const index = generateIndex();
        return buildServiceCharge({
            memberId: `member-${index}`,
            amount: generateFloatBetween(2, 10),
            ...clean(args)
        });
    },
    generateHoldPaymentMethod(args = {}) {
        const index = generateIndex();
        return buildHoldPaymentMethod({
            employeeId: index,
            ...clean(args)
        });
    },
    generateDirectPaymentMethod(args = {}) {
        const index = generateIndex();
        return buildDirectPaymentMethod({
            employeeId: index,
            bank: `bank-${index}`,
            account: `bank-${index}`,
            ...clean(args)
        });
    },
    generateMailPaymentMethod(args = {}) {
        const index = generateIndex();
        return buildMailPaymentMethod({
            employeeId: index,
            address: `address-${index}`,
            ...clean(args)
        });
    }
};
