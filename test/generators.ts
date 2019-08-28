import * as _ from "lodash";
import * as moment from "moment";
import {
    CommissionedEmployee,
    DirectPaymentMethod,
    Employee,
    EmployeeType,
    HoldPaymentMethod,
    HourlyEmployee,
    MailPaymentMethod,
    PaymentMethodType,
    SalariedEmployee,
    SalesReceipt,
    ServiceCharge,
    TimeCard,
    UnionMember
} from "../src";

export const generateIndex = (() => {
    let index = _.random(1, 100);
    return () => index++;
})();

export function generateHourlyEmployee(args: Partial<HourlyEmployee> = {}): HourlyEmployee {
    const hourlyRate = generateFloatBetween(0, 10);
    return {
        ...generateEmployee(),
        work: {
            type: EmployeeType.HOURLY,
            hourlyRate
        },
        ...args
    };
}

export function generateSalariedEmployee(args: Partial<SalariedEmployee> = {}): SalariedEmployee {
    const monthlySalary = generateFloatBetween(10, 20);
    return {
        ...generateEmployee(),
        work: {
            type: EmployeeType.SALARIED,
            monthlySalary
        },
        ...args
    };
}

export function generateCommissionedEmployee(args: Partial<CommissionedEmployee> = {}): CommissionedEmployee {
    return {
        ...generateEmployee(),
        work: {
            type: EmployeeType.COMMISSIONED,
            monthlySalary: generateFloatBetween(10, 20),
            commissionRate: generateFloatBetween(20, 30)
        },
        ...args
    };
}

function generateEmployee(): Omit<Employee, "work"> {
    const index = generateIndex();
    return {
        id: index,
        name: `name of employee ${index}`,
        address: `address of employee ${index}`
    };
}

export function generateTimeCard(args: Partial<TimeCard> = {}): TimeCard {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        hours: generateFloatBetween(2, 10),
        ...args
    };
}

export function generateSalesReceipt(args: Partial<SalesReceipt> = {}): SalesReceipt {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        amount: generateFloatBetween(2, 10),
        ...args
    };
}

export function generateServiceCharge(args: Partial<ServiceCharge> = {}): ServiceCharge {
    const index = generateIndex();
    return {
        memberId: `member-${index}`,
        amount: generateFloatBetween(2, 10),
        ...args
    };
}

function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}

export function generateHoldPaymentMethod(args: Partial<HoldPaymentMethod> = {}): HoldPaymentMethod {
    const index = generateIndex();
    return {
        type: PaymentMethodType.HOLD,
        employeeId: index,
        ...args
    };
}

export function generateDirectPaymentMethod(args: Partial<DirectPaymentMethod> = {}): DirectPaymentMethod {
    const index = generateIndex();
    return {
        type: PaymentMethodType.DIRECT,
        employeeId: index,
        account: `account-${index}`,
        bank: `bank-${index}`,
        ...args
    };
}

export function generateMailPaymentMethod(args: Partial<MailPaymentMethod> = {}): MailPaymentMethod {
    const index = generateIndex();
    return {
        type: PaymentMethodType.MAIL,
        employeeId: index,
        address: `address-${index}`,
        ...args
    };
}

export function generateUnionMember(args: Partial<UnionMember> = {}): UnionMember {
    return {
        employeeId: generateIndex(),
        memberId: `member-${generateIndex()}`,
        rate: generateFloatBetween(0, 100),
        ...args
    };
}
