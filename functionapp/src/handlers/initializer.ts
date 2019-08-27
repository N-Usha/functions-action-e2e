import { IOrchestratable } from '../interfaces/IOrchestratable';
import { StateConstant } from '../constants/state';

export class Initializer implements IOrchestratable {
    public invoke(): StateConstant {
        return StateConstant.ValidateParameter;
    }
}