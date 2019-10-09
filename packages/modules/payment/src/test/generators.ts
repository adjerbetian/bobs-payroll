import { clean, isoDate } from "@payroll/common";
import { generators as coreGenerators } from "@payroll/core/test";
import { EntityGenerator, generateFloatBetween, generateIndex } from "@payroll/test";
import { buildPayment } from "../domain";

type Generators = typeof coreGenerators & {
    generatePayment: EntityGenerator<typeof buildPayment>;
};

export const generators: Generators = {
    ...coreGenerators,
    generatePayment(args = {}) {
        const index = generateIndex();
        return buildPayment({
            amount: generateFloatBetween(1000, 2000),
            employeeId: index,
            date: isoDate(),
            method: generators.generateHoldPaymentMethod({ employeeId: args.employeeId || index }),
            ...clean(args)
        });
    }
};
