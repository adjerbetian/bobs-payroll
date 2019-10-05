import { exec } from "child_process";

export async function execute(command: string): Promise<string> {
    return new Promise((resolve, reject) =>
        exec(command, { encoding: "utf8" }, (err, stdout) => {
            if (err) reject(err);
            else resolve(stdout.trim());
        })
    );
}
