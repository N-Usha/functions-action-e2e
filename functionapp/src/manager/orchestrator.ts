import { StateConstant } from '../constants/state';
import { IActionContext } from '../interfaces/IActionContext';
import { IActionParameters } from '../interfaces/IActionParameters';
import { IOrchestratable } from '../interfaces/IOrchestratable';
import {
    NotImplementedException,
    InvocationException,
    ChangeParamsException,
    ChangeContextException
} from '../exceptions';
import { Builder } from './builder';

export class Orchestrator {
    private _state : StateConstant;
    private _handlers: { [state: string]: IOrchestratable };
    private _params: IActionParameters;
    private _context: IActionContext;

    constructor() {
        this._state = StateConstant.Initialize;
        this._handlers = {};
        this._params = Builder.GetDefaultActionParameters();
        this._context = Builder.GetDefaultActionContext();
    }

    public register(stateName: StateConstant, handler: IOrchestratable): void {
        this._handlers[stateName] = handler;
    }

    public execute(): void {
        if (this._state === undefined || this._handlers[this._state] === undefined) {
            throw new NotImplementedException(`${this._state} is not implemented`);
        }

        if (this.isDone) {
            return;
        }

        const handler: IOrchestratable = this._handlers[this._state];
        let nextState: StateConstant = this.executeInvocation(handler);
        this.executeChangeParams(handler);
        this.executeChangeContext(handler);
        this._state = nextState;
    }

    private executeInvocation(handler: IOrchestratable): StateConstant {
        if (handler.invoke === undefined) {
            throw new NotImplementedException(`Handler ${this._state} does not implement invoke()`);
        }

        try {
            return handler.invoke(this._state, this._params, this._context);
        } catch (expt) {
            const errorState = this._state;
            this._state = StateConstant.Fail;
            throw new InvocationException(errorState, expt);
        }
    }

    private executeChangeParams(handler: IOrchestratable): void {
        if (handler.changeParams !== undefined) {
            try {
                this._params = handler.changeParams(this._state, this._params, this._context);
            } catch (expt) {
                const errorState = this._state;
                this._state = StateConstant.Fail;
                throw new ChangeParamsException(errorState, expt);
            }
        }
    }

    private executeChangeContext(handler: IOrchestratable): void {
        if (handler.changeContext !== undefined) {
            try {
                this._context = handler.changeContext(this._state, this._params, this._context);
            } catch (expt) {
                const errorState = this._state;
                this._state = StateConstant.Fail;
                throw new ChangeContextException(errorState, expt);
            }
        }
    }

    public get isDone(): boolean {
        return this._state === StateConstant.Succeed ||
            this._state === StateConstant.Fail ||
            this._state === StateConstant.Neutral;
    }

    public get state(): StateConstant {
        return this._state;
    }
}