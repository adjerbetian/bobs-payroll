const tsConfig = require("./.mocharc.ts");

module.exports = {
    ...tsConfig,
    file: ["node_modules/@infra/test/src/runners/mocha"],
    spec: "./src/**/*.unit.ts"
};
