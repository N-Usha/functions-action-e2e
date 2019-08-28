import * as core from '@actions/core';

import { Orchestrator } from './manager/orchestrator';
import { StateConstant } from './constants/state';
import { Initializer } from './handlers/initializer';
import { ParameterHandler } from './handlers/parameterHandler';
import { ResourceHandler } from './handlers/resourceHandler';
import { AppsettingsHandler } from './handlers/appsettingsHandler';
import { ContentPreparer } from './handlers/contentPreparer';
import { ContentPublisher } from './handlers/contentPublisher';
import { ContentValidator } from './handlers/contentValidator';
import { UnexpectedExitException, ExecutionException } from './exceptions';


async function main(): Promise<void> {
    const actionManager = new Orchestrator();
    actionManager.register(StateConstant.Initialize, new Initializer());
    actionManager.register(StateConstant.ValidateParameter, new ParameterHandler());
    actionManager.register(StateConstant.ValidateAzureResource, new ResourceHandler());
    actionManager.register(StateConstant.ValidateFunctionappSettings, new AppsettingsHandler());
    actionManager.register(StateConstant.PreparePublishContent, new ContentPreparer());
    actionManager.register(StateConstant.PublishContent, new ContentPublisher());
    actionManager.register(StateConstant.ValidatePublishedContent, new ContentValidator());

    while (!actionManager.isDone) {
        try {
            await actionManager.execute();
        } catch (expt) {
            const e: ExecutionException = expt as ExecutionException
            e.PrintTraceback(core.error);
            console.trace();
        }
    }

    switch (actionManager.state) {
        case StateConstant.Succeed:
            core.debug("Deployment Succeeded!");
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