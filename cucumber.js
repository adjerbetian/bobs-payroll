module.exports = {
    default: [
        `src/e2e/**/*.feature`,
        `--require-module ts-node/register`,
        `--require-module module-alias/register`,
        `--require 'src/e2e/step_definitions/**/*.ts`
    ].join(" ")
};
