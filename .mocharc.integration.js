const unitConfig = require("./.mocharc.unit");

module.exports = {
    ...unitConfig,
    file: [
        ...unitConfig.file,
        "node_modules/@payroll/mongo/src/test/runners/mocha"
    ],
    spec: "./src/**/*.spec.ts"
};
