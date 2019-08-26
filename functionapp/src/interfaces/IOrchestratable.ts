import { StateConstant } from '../constants/state';

export interface IOrchestratable {
    invoke(currentState: StateConstant, params: Object, context: Object): StateConstant;
}

export interface IOrchestratableMethod {
    (currentState: StateConstant, params: Object, context: Object): StateConstant;
}