import * as core from '@actions/core';

import { Orchestrator } from './manager/orchestrator';
import { StateConstant } from './constants/state';
import { Initializer } from './handlers/initializer';
import { ParameterHandler } from './handlers/parameterHandler';
import { ResourceHandler } from './handlers/resourceHandler';
import { UnexpectedExitException, ExecutionException } from './exceptions';


function main(): void {
    const actionManager = new Orchestrator();
    actionManager.register(StateConstant.Initialize, new Initializer());
    actionManager.register(StateConstant.ValidateParameter, new ParameterHandler());
    actionManager.register(StateConstant.ValidateAzureResource, new ResourceHandler());

    while (!actionManager.isDone) {
        try {
            actionManager.execute();
        } catch (expt) {
            const e: ExecutionException = expt as ExecutionException
            e.PrintTraceback(core.error);
        }
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