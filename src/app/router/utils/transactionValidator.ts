import * as assert from "assert";
import { isNull, isUndefined, isEmpty, isNumber } from "lodash";
import * as moment from "moment";
import { RouteFormatError } from "../errors";

export interface TransactionValidator {
    assertIsISODate(date?: string): date is string;
    assertIsIncludedIn<T>(value: T, array: T[]): boolean;
    assertIsNotEmpty<T>(value?: T): value is T;
    assertIsTrue(condition: boolean): condition is true;
    assertEquals<T>(a: T, b: T): boolean;
}

export function buildTransactionValidator(transactionName: string): TransactionValidator {
    return {
        assertIsNotEmpty<T>(value?: T): value is T {
            return wrap(() => {
                assert(!isNull(value));
                assert(!isUndefined(value));
                assert(!isEmpty(value) || isNumber(value));
            });
        },

        assertIsISODate(date?): date is string {
            return wrap(() => assert(moment(date || "", "YYYY-MM-DD", true).isValid()));
        },

        assertIsIncludedIn(value, array): boolean {
            return wrap(() => assert(array.includes(value)));
        },
        assertIsTrue(condition): condition is true {
            return wrap(() => assert(condition));
        },
        assertEquals(a, b): boolean {
            return wrap(() => {
                assert(!isUndefined(a));
                assert(!isUndefined(b));
                assert(a === b);
            });
        }
    };

    function wrap(assertion: () => void): boolean {
        try {
            assertion();
        } catch (err) {
            throw new RouteFormatError(transactionName);
        }
        return true;
    }
}
