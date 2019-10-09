const tsConfig = require("./.mocharc.ts");

module.exports = {
    ...tsConfig,
    file: ["node_modules/@payroll/test/dist/runners/mocha"],
    spec: "./src/**/*.unit.ts"
};
