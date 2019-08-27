"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this._state === undefined || this._handlers[this._state] === undefined) {
                throw new exceptions_1.NotImplementedException(`${this._state} is not implemented`);
            }
            if (this.isDone) {
                return;
            }
            const handler = this._handlers[this._state];
            let nextState = yield this.executeInvocation(handler);
            this._params = yield this.executeChangeParams(handler);
            this._context = yield this.executeChangeContext(handler);
            this._state = nextState;
        });
    }
    executeInvocation(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (handler.invoke === undefined) {
                throw new exceptions_1.NotImplementedException(`Handler ${this._state} does not implement invoke()`);
            }
            try {
                const readonlyParams = Object.assign({}, this._params);
                const readonlyContext = Object.assign({}, this._context);
                return yield handler.invoke(this._state, readonlyParams, readonlyContext);
            }
            catch (expt) {
                const errorState = this._state;
                this._state = state_1.StateConstant.Fail;
                throw new exceptions_1.InvocationException(errorState, expt);
            }
        });
    }
    executeChangeParams(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (handler.changeParams !== undefined) {
                try {
                    const readonlyParams = Object.assign({}, this._params);
                    const readonlyContext = Object.assign({}, this._context);
                    return yield handler.changeParams(this._state, readonlyParams, readonlyContext);
                }
                catch (expt) {
                    const errorState = this._state;
                    this._state = state_1.StateConstant.Fail;
                    throw new exceptions_1.ChangeParamsException(errorState, expt);
                }
            }
        });
    }
    executeChangeContext(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (handler.changeContext !== undefined) {
                try {
                    const readonlyParams = Object.assign({}, this._params);
                    const readonlyContext = Object.assign({}, this._context);
                    return yield handler.changeContext(this._state, readonlyParams, readonlyContext);
                }
                catch (expt) {
                    const errorState = this._state;
                    this._state = state_1.StateConstant.Fail;
                    throw new exceptions_1.ChangeContextException(errorState, expt);
                }
            }
        });
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