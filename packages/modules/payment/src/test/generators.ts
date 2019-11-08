import { µ } from "@payroll/common";
import { generators as coreGenerators } from "@modules/core/test";
import { EntityGenerator, generateFloatBetween, generateIndex } from "@infra/test";
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
            date: µ.isoDate(),
            method: generators.generateHoldPaymentMethod({ employeeId: args.employeeId || index }),
            ...µ.clean(args)
        });
    }
};
