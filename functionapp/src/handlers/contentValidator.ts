import * as core from '@actions/core';
import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";
import { IActionParameters } from "../interfaces/IActionParameters";
import { IActionContext } from "../interfaces/IActionContext";
import { ConfigurationConstant } from '../constants/configuration';
import { AzureResourceError } from '../exceptions';

export class ContentValidator implements IOrchestratable {
    public async invoke(state: StateConstant, params: IActionParameters, context: IActionContext): Promise<StateConstant> {
        try {
            await context.appServiceUtil.pingApplication();
        } catch (expt) {
            throw new AzureResourceError(state,"pingApplication", `Failed to ping functino app ${params.appName}`, expt);
        }

        core.setOutput(ConfigurationConstant.ParamOutputResultName, `https://${params.appName}.azurewebsites.net`);
        return StateConstant.Succeed;
    }
}