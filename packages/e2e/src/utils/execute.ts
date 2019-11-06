import { exec } from "child_process";

async function execute(command: string): Promise<string> {
    return new Promise((resolve, reject) =>
        exec(command, { encoding: "utf8" }, (err, stdout) => {
            if (err) reject(err);
            else resolve(stdout.trim());
        })
    );
}

export async function executePayrollCommand(command: string): Promise<string> {
    return await execute(`ts-node -T node_modules/@infra/app/src/main.ts ${command}`);
}
