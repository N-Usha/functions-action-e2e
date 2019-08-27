"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const orchestrator_1 = require("./manager/orchestrator");
const state_1 = require("./constants/state");
const initializer_1 = require("./handlers/initializer");
const parameterHandler_1 = require("./handlers/parameterHandler");
const resourceHandler_1 = require("./handlers/resourceHandler");
const exceptions_1 = require("./exceptions");
function main() {
    const actionManager = new orchestrator_1.Orchestrator();
    actionManager.register(state_1.StateConstant.Initialize, new initializer_1.Initializer());
    actionManager.register(state_1.StateConstant.ValidateParameter, new parameterHandler_1.ParameterHandler());
    actionManager.register(state_1.StateConstant.ValidateAzureResource, new resourceHandler_1.ResourceHandler());
    while (!actionManager.isDone) {
        try {
            actionManager.execute();
        }
        catch (expt) {
            const e = expt;
            e.PrintTraceback(core.error);
        }
    }
    switch (actionManager.state) {
        case state_1.StateConstant.Succeed:
            core.debug("Deployment Succeeded!");
            core.setOutput("functionapp-url", "https://functions.azure.com");
            return;
        case state_1.StateConstant.Fail:
            core.setFailed("Deployment Failed!");
            return;
        case state_1.StateConstant.Neutral:
            core.debug("Deployment Ends Neuturally!");
            return;
        default:
            const expt = new exceptions_1.UnexpectedExitException(actionManager.state);
            core.setFailed(expt.message);
            throw expt;
    }
}
main();
