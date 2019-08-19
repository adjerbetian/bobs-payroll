import * as assert from "assert";
import { isNull, isUndefined } from "lodash";
import * as moment from "moment";
import { TransactionFormatError } from "../errors";

export interface TransactionValidator {
    assertIsISODate(date?: string | null): void;
    assertIsIncludedIn(value: any, array: any[]): void;
    assertIsNotEmpty(value?: any | null): void;
    assertIsTrue(condition: boolean): void;
}

export function buildTransactionValidator(transactionName: string): TransactionValidator {
    return {
        assertIsNotEmpty(value?: any | null): void {
            wrap(() => {
                assert(!isNull(value));
                assert(!isUndefined(value));
                assert(!!value || value === 0);
            });
        },

        assertIsISODate(date?: string | null): void {
            wrap(() => assert(moment(date || "", "YYYY-MM-DD", true).isValid()));
        },

        assertIsIncludedIn(value: any, array: any[]): void {
            wrap(() => assert(array.includes(value)));
        },
        assertIsTrue(condition: boolean): void {
            wrap(() => assert(condition));
        }
    };

    function wrap(assertion: () => void): void {
        try {
            assertion();
        } catch (err) {
            throw new TransactionFormatError(transactionName);
        }
    }
}
