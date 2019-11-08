const { execSync } = require("child_process");

cleanDist("./dist");
execSync("tsc --project tsconfig.bin.json");
moveDependency("@modules/core");
moveDependency("@modules/payment");
moveDependency("@infra/mongo");
moveDependency("@payroll/common");

function moveDependency(folder) {
    execSync(`rm -f dist/node_modules/${folder}/*.js`);
    execSync(`mv dist/node_modules/${folder}/src/* dist/node_modules/${folder}/`);
    execSync(`rm -r dist/node_modules/${folder}/src`);
}
function cleanDist(folder) {
    execSync(`rm -rf ${folder}`);
}
