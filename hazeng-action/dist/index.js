"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const core = require("@actions/core");
function main() {
    const maximum_string = core.getInput("maximum");
    const minimum_string = core.getInput("minimum");
    if (!maximum_string || !minimum_string) {
        core.setFailed("maximum or minimum cannot be null");
        return;
    }
    let maximum_int;
    let minimum_int;
    try {
        maximum_int = Number.parseInt(maximum_string);
        minimum_int = Number.parseInt(minimum_string);
    }
    catch (_a) {
        core.setFailed("maximum and minimum should be integers");
    }
    const result_int = _.random(maximum_int, minimum_int);
    core.setOutput("result", result_int.toString());
}
main();
