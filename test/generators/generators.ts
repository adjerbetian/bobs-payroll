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
    buildUnionMember,
    CommissionedEmployee,
    DirectPaymentMethod,
    EntityModel,
    HoldPaymentMethod,
    HourlyEmployee,
    isoDate,
    MailPaymentMethod,
    Payment,
    SalariedEmployee,
    SalesReceipt,
    ServiceCharge,
    TimeCard,
    UnionMember
} from "../../src";
import { generateFloatBetween, generateIndex } from "./common";

export const generators = {
    generateTimeCard(args: PartialEntity<TimeCard> = {}): TimeCard {
        const index = generateIndex();
        return buildTimeCard({
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            hours: generateFloatBetween(2, 8),
            ...args
        });
    },
    generateUnionMember(args: PartialEntity<UnionMember> = {}): UnionMember {
        return buildUnionMember({
            employeeId: generateIndex(),
            memberId: `member-${generateIndex()}`,
            rate: generateFloatBetween(0, 0.1),
            ...args
        });
    },
    generateHourlyEmployee(args: PartialEntity<HourlyEmployee> = {}): HourlyEmployee {
        const index = generateIndex();
        return buildHourlyEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            hourlyRate: generateFloatBetween(10, 20),
            ...args
        });
    },
    generateSalariedEmployee(args: PartialEntity<SalariedEmployee> = {}): SalariedEmployee {
        const index = generateIndex();
        return buildSalariedEmployee({
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            ...args
        });
    },
    generateCommissionedEmployee(args: PartialEntity<CommissionedEmployee> = {}): CommissionedEmployee {
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
    generateSalesReceipt(args: PartialEntity<SalesReceipt> = {}): SalesReceipt {
        const index = generateIndex();
        return buildSalesReceipt({
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            amount: generateFloatBetween(10000, 50000),
            ...args
        });
    },
    generateServiceCharge(args: PartialEntity<ServiceCharge> = {}): ServiceCharge {
        const index = generateIndex();
        return buildServiceCharge({
            memberId: `member-${index}`,
            amount: generateFloatBetween(2, 10),
            ...args
        });
    },
    generateHoldPaymentMethod(args: PartialEntity<HoldPaymentMethod> = {}): HoldPaymentMethod {
        const index = generateIndex();
        return buildHoldPaymentMethod({
            employeeId: index,
            ...args
        });
    },
    generateDirectPaymentMethod(args: PartialEntity<DirectPaymentMethod> = {}): DirectPaymentMethod {
        const index = generateIndex();
        return buildDirectPaymentMethod({
            employeeId: index,
            bank: `bank-${index}`,
            account: `bank-${index}`,
            ...args
        });
    },
    generateMailPaymentMethod(args: PartialEntity<MailPaymentMethod> = {}): MailPaymentMethod {
        const index = generateIndex();
        return buildMailPaymentMethod({
            employeeId: index,
            address: `address-${index}`,
            ...args
        });
    },
    //todo: clean the omit
    generatePayment(args: Omit<PartialEntity<Payment>, "method"> = {}): Payment {
        const index = generateIndex();
        return buildPayment({
            amount: generateFloatBetween(1000, 2000),
            employeeId: index,
            date: isoDate(),
            method: generators.generateHoldPaymentMethod({ employeeId: index }),
            ...args
        });
    }
};

type PartialEntity<Entity> = Partial<EntityModel<Entity>>;
