import * as moment from "moment";
import {
    buildCommissionedEmployee,
    buildDirectPaymentMethod,
    buildHoldPaymentMethod,
    buildHourlyEmployee,
    buildMailPaymentMethod,
    buildPayment,
    buildSalariedEmployee,
    buildSalesReceipt,
    buildServiceCharge,
    buildTimeCard,
    buildUnionMember
} from "../../app";
import { isoDate } from "../../utils";
import { generateFloatBetween, generateIndex } from "./common";

interface Generators {
    generateTimeCard: Generator<typeof buildTimeCard>;
    generateUnionMember: Generator<typeof buildUnionMember>;
    generateHourlyEmployee: Generator<typeof buildHourlyEmployee>;
    generateSalariedEmployee: Generator<typeof buildSalariedEmployee>;
    generateCommissionedEmployee: Generator<typeof buildCommissionedEmployee>;
    generateSalesReceipt: Generator<typeof buildSalesReceipt>;
    generateServiceCharge: Generator<typeof buildServiceCharge>;
    generateHoldPaymentMethod: Generator<typeof buildHoldPaymentMethod>;
    generateDirectPaymentMethod: Generator<typeof buildDirectPaymentMethod>;
    generateMailPaymentMethod: Generator<typeof buildMailPaymentMethod>;
    generatePayment: Generator<typeof buildPayment>;
}

export const generators: Generators = {
    generateTimeCard(args = {}) {
        const index = generateIndex();
        return buildTimeCard({
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            hours: generateFloatBetween(2, 8),
            ...args
        });
    },
    generateUnionMember(args = {}) {
        return buildUnionMember({
            employeeId: generateIndex(),
            memberId: `member-${generateIndex()}`,
            rate: generateFloatBetween(0, 0.1),
            ...args
        });
    },
    generateHourlyEmployee(args = {}) {
        const index = generateIndex();
        return buildHourlyEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            hourlyRate: generateFloatBetween(10, 20),
            ...args
        });
    },
    generateSalariedEmployee(args = {}) {
        const index = generateIndex();
        return buildSalariedEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            ...args
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
            ...args
        });
    },
    generateSalesReceipt(args = {}) {
        const index = generateIndex();
        return buildSalesReceipt({
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            amount: generateFloatBetween(10000, 50000),
            ...args
        });
    },
    generateServiceCharge(args = {}) {
        const index = generateIndex();
        return buildServiceCharge({
            memberId: `member-${index}`,
            amount: generateFloatBetween(2, 10),
            ...args
        });
    },
    generateHoldPaymentMethod(args = {}) {
        const index = generateIndex();
        return buildHoldPaymentMethod({
            employeeId: index,
            ...args
        });
    },
    generateDirectPaymentMethod(args = {}) {
        const index = generateIndex();
        return buildDirectPaymentMethod({
            employeeId: index,
            bank: `bank-${index}`,
            account: `bank-${index}`,
            ...args
        });
    },
    generateMailPaymentMethod(args = {}) {
        const index = generateIndex();
        return buildMailPaymentMethod({
            employeeId: index,
            address: `address-${index}`,
            ...args
        });
    },
    generatePayment(args = {}) {
        const index = generateIndex();
        return buildPayment({
            amount: generateFloatBetween(1000, 2000),
            employeeId: index,
            date: isoDate(),
            method: generators.generateHoldPaymentMethod({ employeeId: args.employeeId || index }),
            ...args
        });
    }
};

type Generator<EntityFactory extends (args: any) => any> = (
    args?: Partial<Parameters<EntityFactory>[0]>
) => ReturnType<EntityFactory>;
