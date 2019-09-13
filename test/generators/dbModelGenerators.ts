import * as moment from "moment";
import {
    CommissionedEmployeeDBModel,
    DirectPaymentMethodDBModel,
    EmployeeType,
    HoldPaymentMethodDBModel,
    HourlyEmployeeDBModel,
    isoDate,
    MailPaymentMethodDBModel,
    PaymentDBModel,
    PaymentMethodType,
    SalariedEmployeeDBModel,
    SalesReceiptDBModel,
    ServiceChargeDBModel,
    TimeCardDBModel,
    UnionMemberDBModel
} from "../../src";
import { generateFloatBetween, generateIndex } from "./common";

export const dbModelGenerators = {
    generateTimeCard(args: Partial<TimeCardDBModel> = {}): TimeCardDBModel {
        const index = generateIndex();
        return {
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            hours: generateFloatBetween(2, 8),
            ...args
        };
    },
    generateUnionMember(args: Partial<UnionMemberDBModel> = {}): UnionMemberDBModel {
        return {
            employeeId: generateIndex(),
            memberId: `member-${generateIndex()}`,
            rate: generateFloatBetween(0, 0.1),
            ...args
        };
    },
    generateHourlyEmployee(args: Partial<HourlyEmployeeDBModel> = {}): HourlyEmployeeDBModel {
        const index = generateIndex();
        return {
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            hourlyRate: generateFloatBetween(10, 20),
            type: EmployeeType.HOURLY,
            ...args
        };
    },
    generateSalariedEmployee(args: Partial<SalariedEmployeeDBModel> = {}): SalariedEmployeeDBModel {
        const index = generateIndex();
        return {
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            type: EmployeeType.SALARIED,
            ...args
        };
    },
    generateCommissionedEmployee(args: Partial<CommissionedEmployeeDBModel> = {}): CommissionedEmployeeDBModel {
        const index = generateIndex();
        return {
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            commissionRate: generateFloatBetween(0, 0.1),
            type: EmployeeType.COMMISSIONED,
            ...args
        };
    },
    generateSalesReceipt(args: Partial<SalesReceiptDBModel> = {}): SalesReceiptDBModel {
        const index = generateIndex();
        return {
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            amount: generateFloatBetween(10000, 50000),
            ...args
        };
    },
    generateServiceCharge(args: Partial<ServiceChargeDBModel> = {}): ServiceChargeDBModel {
        const index = generateIndex();
        return {
            memberId: `member-${index}`,
            amount: generateFloatBetween(2, 10),
            ...args
        };
    },
    generateHoldPaymentMethod(args: Partial<HoldPaymentMethodDBModel> = {}): HoldPaymentMethodDBModel {
        const index = generateIndex();
        return {
            employeeId: index,
            type: PaymentMethodType.HOLD,
            ...args
        };
    },
    generateDirectPaymentMethod(args: Partial<DirectPaymentMethodDBModel> = {}): DirectPaymentMethodDBModel {
        const index = generateIndex();
        return {
            employeeId: index,
            bank: `bank-${index}`,
            account: `bank-${index}`,
            type: PaymentMethodType.DIRECT,
            ...args
        };
    },
    generateMailPaymentMethod(args: Partial<MailPaymentMethodDBModel> = {}): MailPaymentMethodDBModel {
        const index = generateIndex();
        return {
            employeeId: index,
            address: `address-${index}`,
            type: PaymentMethodType.MAIL,
            ...args
        };
    },
    generatePayment(args: Partial<PaymentDBModel> = {}): PaymentDBModel {
        const index = generateIndex();
        return {
            amount: generateFloatBetween(1000, 2000),
            employeeId: index,
            date: isoDate(),
            method: dbModelGenerators.generateHoldPaymentMethod({ employeeId: index }),
            ...args
        };
    }
};
