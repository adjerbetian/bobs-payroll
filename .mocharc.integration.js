const unitConfig = require("./.mocharc.unit");

module.exports = {
    ...unitConfig,
    file: [
        ...unitConfig.file,
        "node_modules/@payroll/mongo/dist/test/runners/mocha"
    ],
    spec: "./src/**/*.spec.ts"
};
