const { execSync } = require("child_process");

move("@modules/core");
move("@modules/payment");
move("@infra/mongo");
move("@payroll/common");

function move(folder) {
    execSync(`rm -f dist/node_modules/${folder}/*.js`);
    execSync(`mv dist/node_modules/${folder}/src/* dist/node_modules/${folder}/`);
    execSync(`rm -r dist/node_modules/${folder}/src`);
}
