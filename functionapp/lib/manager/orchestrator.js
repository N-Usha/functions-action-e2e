"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../constants/state");
const exceptions_1 = require("../exceptions");
const builder_1 = require("./builder");
class Orchestrator {
    constructor() {
        this._state = state_1.StateConstant.Initialize;
        this._handlers = {};
        this._params = builder_1.Builder.GetDefaultActionParameters();
        this._context = builder_1.Builder.GetDefaultActionContext();
    }
    register(stateName, handler) {
        this._handlers[stateName] = handler;
    }
    execute() {
        if (this._state === undefined || this._handlers[this._state] === undefined) {
            throw new exceptions_1.NotImplementedException(`${this._state} is not implemented`);
        }
        if (this.isDone) {
            return;
        }
        const handler = this._handlers[this._state];
        let nextState = this.executeInvocation(handler);
        this.executeChangeParams(handler);
        this.executeChangeContext(handler);
        this._state = nextState;
    }
    executeInvocation(handler) {
        if (handler.invoke === undefined) {
            throw new exceptions_1.NotImplementedException(`Handler ${this._state} does not implement invoke()`);
        }
        try {
            return handler.invoke(this._state, this._params, this._context);
        }
        catch (expt) {
            throw new exceptions_1.InvocationException(this._state, expt);
        }
    }
    executeChangeParams(handler) {
        if (handler.changeParams !== undefined) {
            try {
                this._params = handler.changeParams(this._state, this._params, this._context);
            }
            catch (expt) {
                throw new exceptions_1.ChangeParamsException(this._state, expt);
            }
        }
    }
    executeChangeContext(handler) {
        if (handler.changeContext !== undefined) {
            try {
                this._context = handler.changeContext(this._state, this._params, this._context);
            }
            catch (expt) {
                throw new exceptions_1.ChangeContextException(this._state, expt);
            }
        }
    }
    get isDone() {
        return this._state === state_1.StateConstant.Succeed ||
            this._state === state_1.StateConstant.Fail ||
            this._state === state_1.StateConstant.Neutral;
    }
    get state() {
        return this._state;
    }
}
exports.Orchestrator = Orchestrator;
