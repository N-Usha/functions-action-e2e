import { StateConstant } from '../constants/state';
import { IOrchestratable } from '../interfaces/IOrchestratable';
import { NotImplementedException } from '../exceptions';

export class Orchestrator {
    private _state : StateConstant;
    private _handlers: { [state: string]: IOrchestratable };
    private _params: { [param: string]: string };
    private _context: { [key: string]: string }

    constructor() {
        this._state = StateConstant.Initialize;
        this._handlers = {};
        this._params = {};
        this._context = {};
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
        const nextState: StateConstant = handler.invoke(this._state, this._params, this._context);
        this._state = nextState;
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