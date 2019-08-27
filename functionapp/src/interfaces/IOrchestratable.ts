import { StateConstant } from '../constants/state';
import { IActionParameters } from './IActionParameters';
import { IActionContext } from './IActionContext';

export interface IOrchestratable {
    invoke: IOrchestratableInvoke;

    // You should only derive a new set a params in here
    changeParams?: IOrchestratableChangeParams;

    // You should only derive a new set of context in here
    changeContext?: IOrchestratableChangeContext;
}

export interface IOrchestratableInvoke {
    (currentState: StateConstant, params: IActionParameters, context: IActionContext): StateConstant;
}

export interface IOrchestratableChangeParams {
    (currentState: StateConstant, params: IActionParameters, context: IActionContext): IActionParameters;
}

export interface IOrchestratableChangeContext {
    (currentState: StateConstant, params: IActionParameters, context: IActionContext): IActionContext;
}