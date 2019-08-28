import * as core from '@actions/core';
import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";
import { IActionParameters } from "../interfaces/IActionParameters";
import { IActionContext } from "../interfaces/IActionContext";

export class ContentValidator implements IOrchestratable {
    public async invoke(_0: StateConstant, _1: IActionParameters, context: IActionContext): Promise<StateConstant> {
        const appUrl: string = await context.appServiceUtil.getApplicationURL();
        core.setOutput('functionapp-url', appUrl);
        return StateConstant.Succeed;
    }
}