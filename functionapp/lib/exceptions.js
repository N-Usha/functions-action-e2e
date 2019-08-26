"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./constants/state");
class BaseException extends Error {
    constructor(message = undefined, inner_exception = undefined) {
        super();
        super.message = message ? message : "";
        this._inner_exception = inner_exception ? inner_exception : null;
    }
    GetInnerException() {
        return this._inner_exception;
    }
}
class NotImplementedException extends BaseException {
}
exports.NotImplementedException = NotImplementedException;
class UnexpectedExitException extends BaseException {
    constructor(state = state_1.StateConstant.Neutral) {
        super(state_1.StateConstant[state]);
    }
}
exports.UnexpectedExitException = UnexpectedExitException;
//# sourceMappingURL=exceptions.js.map