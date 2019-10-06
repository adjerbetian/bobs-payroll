const path = require("path");
const unitConfig = require("./.mocharc.unit");

module.exports = {
    ...unitConfig,
    file: [
        ...unitConfig.file,
        path.resolve(__dirname, "node_modules/@bobs-payroll/mongo/dist/test/runners/mocha")
    ],
    spec: "./src/**/*.spec.ts"
};
