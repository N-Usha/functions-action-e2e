"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./constants/state");
class BaseException extends Error {
    constructor(message = undefined, innerException = undefined) {
        super();
        this._innerException = innerException ? innerException : undefined;
        super.message = message ? message : "";
    }
    GetInnerException() {
        return this._innerException;
    }
    GetTraceback() {
        let errorMessages = [this.message];
        let innerException = this._innerException;
        while (innerException !== undefined) {
            errorMessages.push(innerException.message);
            innerException = innerException._innerException;
        }
        return errorMessages;
    }
    PrintTraceback(printer) {
        const traceback = this.GetTraceback();
        for (let i = 0; i < traceback.length; i++) {
            const prefix = " ".repeat(i * 2);
            printer(`${prefix}${traceback[i]}`);
        }
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
        let errorMessage = `Execution Exception (state: ${state_1.StateConstant[state]})`;
        if (executionStage !== undefined) {
            errorMessage += ` (step: ${executionStage})`;
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
class ValidationError extends BaseException {
    constructor(state, field, expectation) {
        super(`At ${state_1.StateConstant[state]}, ${field} : ${expectation}.`);
    }
}
exports.ValidationError = ValidationError;
