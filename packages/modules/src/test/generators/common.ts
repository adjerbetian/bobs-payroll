import * as _ from "lodash";

export const generateIndex = (() => {
    let index = _.random(1, 100);
    return () => index++;
})();

export function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}
