import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";

export class AppsettingsHandler implements IOrchestratable {
    public async invoke(): Promise<StateConstant> {
        // Blocked by app settings is not provided in pipelines-appservice-lib
        return StateConstant.PreparePublishContent;
    }
}