const path = require("path");

module.exports = {
    default: [
        `src/features/*.feature`,
        `--require-module ts-node/register/transpile-only`,
        `--require ${path.resolve(__dirname, "node_modules/@infra/test/src/runners/cucumber.ts")}`,
        `--require ${path.resolve(__dirname, "node_modules/@infra/mongo/src/test/runners/cucumber.ts")}`,
        `--require src/**/*.ts`,
        `--format ./src/setup/SimpleFormatter`
    ].join(" ")
};
