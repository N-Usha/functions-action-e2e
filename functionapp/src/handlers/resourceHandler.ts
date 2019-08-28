import { IAuthorizationHandler } from "pipelines-appservice-lib/lib/ArmRest/IAuthorizationHandler";
import { getHandler } from 'pipelines-appservice-lib/lib/AuthorizationHandlerFactory';
import { AzureResourceFilterUtility } from "pipelines-appservice-lib/lib/RestUtilities/AzureResourceFilterUtility";
import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";
import { ValidationError } from "../exceptions";
import { IActionParameters } from "../interfaces/IActionParameters";
import { IActionContext } from "../interfaces/IActionContext";

export class ResourceHandler implements IOrchestratable {
    private _resourceGroupName: string;
    private _isLinux: boolean;
    private _kind: string;
    private _endpoint: IAuthorizationHandler;

    public async invoke(state: StateConstant, params: IActionParameters): Promise<StateConstant> {
        const endpoint: IAuthorizationHandler = getHandler();
        await this.getResourceDetails(state, endpoint, params.appName);
        return StateConstant.ValidateFunctionappSettings;
    }

    public async changeContext(_0: StateConstant, _1: IActionParameters, context: IActionContext): Promise<IActionContext> {
        context.isLinux = this._isLinux;
        context.kind = this._kind;
        context.resourceGroupName = this._resourceGroupName;
        context.endpoint = this._endpoint;
        return context;
    }

    private async getResourceDetails(state: StateConstant, endpoint: IAuthorizationHandler, appName: string) {
        let appDetails = await AzureResourceFilterUtility.getAppDetails(endpoint, appName);
        if (appDetails === undefined) {
            throw new ValidationError(state, "app-name", "function app should exist");
        }

        this._resourceGroupName = appDetails["resourceGroupName"];
        this._kind = appDetails["kind"];
        this._isLinux = this._kind.indexOf('linux') >= 0;
    }
}