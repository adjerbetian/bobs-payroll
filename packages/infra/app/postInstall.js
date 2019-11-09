const { execSync } = require("child_process");
const { existsSync, rmdirSync, copyFileSync } = require("fs");

cleanDist();
compileTypeScript();
copyPackageJSONOfDependencies();

function cleanDist() {
    rmdirSync("./dist", { recursive: true });
}
function compileTypeScript() {
    execSync("tsc --project tsconfig.bin.json");
}
function copyPackageJSONOfDependencies() {
    const { dependencies } = require("./package");
    Object.keys(dependencies).forEach(dependency => copyPackageJSONOfDependency(dependency));
}
function copyPackageJSONOfDependency(folder) {
    if (!existsSync(`dist/node_modules/${folder}`)) return;
    copyFileSync(`node_modules/${folder}/package.json`, `dist/node_modules/${folder}/package.json`);
}
