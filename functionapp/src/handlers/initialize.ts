import { IOrchestratable } from '../interfaces/IOrchestratable';
import { StateConstant } from '../constants/state';

export class InitializeHandler implements IOrchestratable {

    public invoke(currentState: StateConstant, params: Object, context: Object): StateConstant {
        return StateConstant.Succeed;
    }
}