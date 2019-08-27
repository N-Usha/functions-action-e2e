import { IOrchestratable } from '../interfaces/IOrchestratable';
import { IActionParameters } from '../interfaces/IActionParameters';
import { StateConstant } from '../constants/state';
import { IActionContext } from '../interfaces/IActionContext';

export class InitializeHandler implements IOrchestratable {
    public invoke(currentState: StateConstant): StateConstant {
        currentState = StateConstant.Succeed;
        return currentState;
    }
}