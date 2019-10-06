const path = require("path");
const tsConfig = require("./.mocharc.ts");

module.exports = {
    ...tsConfig,
    file: [path.resolve(__dirname, "node_modules/@bobs-payroll/test/dist/runners/mocha")],
    spec: "./src/**/*.unit.ts"
};
