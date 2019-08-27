"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./constants/state");
class BaseException extends Error {
    constructor(message = undefined, innerException = undefined) {
        super();
        super.message = message ? message : "";
        this._innerException = innerException ? innerException : undefined;
    }
    GetInnerException() {
        return this._innerException;
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
class ExecutionException extends BaseException {
    constructor(state, executionStage, innerException) {
        let errorMessage = `Execution Exception on ${state_1.StateConstant[state]}`;
        if (executionStage !== undefined) {
            errorMessage += ` when ${executionStage}`;
        }
        super(errorMessage, innerException);
    }
}
exports.ExecutionException = ExecutionException;
class InvocationException extends ExecutionException {
    constructor(state, innerException) {
        super(state, "Invocation", innerException);
    }
}
exports.InvocationException = InvocationException;
class ChangeParamsException extends ExecutionException {
    constructor(state, innerException) {
        super(state, "ChangeParams", innerException);
    }
}
exports.ChangeParamsException = ChangeParamsException;
class ChangeContextException extends ExecutionException {
    constructor(state, innerException) {
        super(state, "ChangeContext", innerException);
    }
}
exports.ChangeContextException = ChangeContextException;
