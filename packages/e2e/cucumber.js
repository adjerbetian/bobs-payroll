const path = require("path");

module.exports = {
    default: [
        `src/features/*.feature`,
        `--require-module ts-node/register/transpile-only`,
        `--require ${path.resolve(__dirname, "../../node_modules/@bobs-payroll/test/dist/runners/cucumber.js")}`,
        `--require ${path.resolve(__dirname, "../../node_modules/@bobs-payroll/mongo/dist/test/runners/cucumber.js")}`,
        `--require src/**/*.ts`,
        `--format ./src/setup/SimpleFormatter`
    ].join(" ")
};
