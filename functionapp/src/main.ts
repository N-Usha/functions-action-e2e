import * as core from '@actions/core';

import { Orchestrator } from './manager/orchestrator';
import { StateConstant } from './constants/state';
import { InitializeHandler } from './handlers/initialize';
import { UnexpectedExitException } from './exceptions';


function main(): void {
    const actionManager = new Orchestrator();
    actionManager.register(StateConstant.Initialize, new InitializeHandler());

    while (!actionManager.isDone) {
        actionManager.execute();
    }

    switch (actionManager.state) {
        case StateConstant.Succeed:
            core.debug("Deployment Succeeded!");
            core.setOutput("functionapp-url", "https://functions.azure.com");
            return
        case StateConstant.Fail:
            core.setFailed("Deployment Failed!");
            return
        case StateConstant.Neutral:
            core.debug("Deployment Ends Neuturally!");
            return
        default:
            const expt = new UnexpectedExitException(actionManager.state);
            core.setFailed(expt.message);
            throw expt;
    }
}

main();