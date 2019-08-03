import { expect } from "../test/e2eTest";
import { execSync } from "child_process";

describe("helloWorld", () => {
    it("should work", function() {
        const text = executeCommand("node dist/index.js");

        expect(text).to.equal("Hello World !");
    });
});

function executeCommand(command: string): string {
    return execSync(command)
        .toString()
        .trim();
}
