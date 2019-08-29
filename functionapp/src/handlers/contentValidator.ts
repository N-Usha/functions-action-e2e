import * as core from '@actions/core';
import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";
import { IActionParameters } from "../interfaces/IActionParameters";
import { IActionContext } from "../interfaces/IActionContext";
import { ConfigurationConstant } from '../constants/configuration';
import { AzureResourceError } from '../exceptions';

export class ContentValidator implements IOrchestratable {
    public async invoke(state: StateConstant, params: IActionParameters, context: IActionContext): Promise<StateConstant> {
        const url: string = await context.appServiceUtil.getApplicationURL();
        core.setOutput(ConfigurationConstant.ParamOutputResultName, url);
        return StateConstant.Succeed;
    }
}