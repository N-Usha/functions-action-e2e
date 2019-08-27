import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";

export class ResourceHandler implements IOrchestratable{
    public invoke(): StateConstant {
        return StateConstant.Succeed;
    }
}