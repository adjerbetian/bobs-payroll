import { Employee } from "../entities/Employee";
import * as _ from "lodash";

let index = _.random(1, 100);

export function generateEmployee(): Employee {
    const index = generateIndex();
    return {
        id: index,
        name: `name of employee ${index}`,
        address: `address of employee ${index}`,
        rateType: "hourly",
        rate: _.round(_.random(0, 10, true), 2)
    };
}

function generateIndex(): number {
    return index++;
}
