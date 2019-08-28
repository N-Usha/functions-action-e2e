import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";
import { IActionParameters } from "../interfaces/IActionParameters";
import { IActionContext } from "../interfaces/IActionContext";
import { PublishMethodConstant } from "../constants/publish_method";
import { KuduServiceUtility } from "pipelines-appservice-lib/lib/RestUtilities/KuduServiceUtility";
import { AzureResourceError, ValidationError } from "../exceptions";

export class ContentPublisher implements IOrchestratable {
    private _deploymentId: string;

    public async invoke(state: StateConstant, _1: IActionParameters, context: IActionContext): Promise<StateConstant> {
        switch (context.publishMethod) {
            case PublishMethodConstant.ZipDeploy:
                this._deploymentId = await this.zipDeploy(state, context.kuduServiceUtil, context.publishContentPath);
                break;
            default:
                throw new ValidationError(state, "content publish", "only accepts ZipDeploy publish method");
        }
        return StateConstant.ValidatePublishedContent;
    }

    public async changeContext(_0: StateConstant, _1: IActionParameters, context: IActionContext): Promise<IActionContext> {
        context.deploymentId = this._deploymentId;
        return context;
    }

    private async zipDeploy(state: StateConstant, kuduServiceUtility: KuduServiceUtility, filePath: string): Promise<string> {
        try {
            return await kuduServiceUtility.deployUsingZipDeploy(filePath);
        } catch (expt) {
            throw new AzureResourceError(state, "zipDeploy", expt as string);
        }
    }
}