module.exports = {
    default: [
        `src/e2e/**/*.feature`,
        `--require-module ts-node/register`,
        `--require 'src/e2e/steps/**/*.ts`
    ].join(" ")
};
