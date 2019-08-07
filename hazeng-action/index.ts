import * as _ from "lodash";
import * as core from "@actions/core";


function main() {
    const maximum_string: string = core.getInput("maximum");
    const minimum_string: string = core.getInput("minimum");

    if (!maximum_string || !minimum_string) {
        core.setFailed("maximum or minimum cannot be null");
        return;
    }

    let maximum_int: number;
    let minimum_int: number;
    try {
        maximum_int = Number.parseInt(maximum_string);
        minimum_int = Number.parseInt(minimum_string);
    } catch {
        core.setFailed("maximum and minimum should be integers");
    }

    const result_int: number = _.random(maximum_int, minimum_int);
    core.setOutput("result", result_int.toString());
}

main();