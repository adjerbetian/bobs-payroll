const { execSync } = require("child_process");
const { existsSync } = require("fs");

cleanDist("./dist");
execSync("tsc --project tsconfig.bin.json");
copyPackageJSONOfDependencies();

function copyPackageJSONOfDependencies() {
    const { dependencies } = require("./package");
    Object.keys(dependencies).forEach(dependency => copyPackageJSONOfDependency(dependency));
}
function copyPackageJSONOfDependency(folder) {
    if (!existsSync(`dist/node_modules/${folder}`)) return;
    execSync(`cp node_modules/${folder}/package.json dist/node_modules/${folder}/`);
}
function cleanDist(folder) {
    execSync(`rm -rf ${folder}`);
}
