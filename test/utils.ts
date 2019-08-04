import { exec } from "child_process";
import * as _ from "lodash";

export async function execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

export const generateIndex = (() => {
    let index = _.random(1, 100);
    return () => index++;
})();
