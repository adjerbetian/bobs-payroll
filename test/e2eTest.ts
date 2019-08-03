import { execSync } from "child_process";

export * from "./unitTest";

before(function() {
    this.timeout(5000);
    execSync("npm run build");
});
