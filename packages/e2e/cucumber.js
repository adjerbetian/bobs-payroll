module.exports = {
    default: [
        `src/features/*.feature`,
        `--require-module ts-node/register/transpile-only`,
        `--require 'src/**/*.ts`,
        `--format ./src/setup/SimpleFormatter`
    ].join(" ")
};
