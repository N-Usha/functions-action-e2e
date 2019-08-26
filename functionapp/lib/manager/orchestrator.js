"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../constants/state");
const exceptions_1 = require("../exceptions");
class Orchestrator {
    constructor() {
        this._state = state_1.StateConstant.Initialize;
        this._handlers = {};
        this._params = {};
        this._context = {};
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
        const nextState = handler.invoke(this._state, this._params, this._context);
        this._state = nextState;
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
//# sourceMappingURL=orchestrator.js.map