module.exports = {
    default: [
        `src/e2e/**/*.feature`,
        `--require-module ts-node/register/transpile-only`,
        `--require 'src/e2e/{setup,steps}/**/*.ts`,
        `--format progress-bar`
    ].join(" ")
};
