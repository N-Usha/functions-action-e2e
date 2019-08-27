import { StateConstant } from './constants/state';

class BaseException extends Error {
    private _innerException: BaseException

    constructor(
        message: string = undefined,
        innerException: BaseException = undefined
    ) {
        super();
        super.message = message ? message : "";
        this._innerException = innerException ? innerException : undefined;
    }

    public GetInnerException(): BaseException {
        return this._innerException;
    }
}

export class NotImplementedException extends BaseException {
}

export class UnexpectedExitException extends BaseException {
    constructor(state: StateConstant = StateConstant.Neutral) {
        super(StateConstant[state]);
    }
}

export class ExecutionException extends BaseException {
    constructor(state: StateConstant, executionStage?: string, innerException?: BaseException) {
        let errorMessage = `Execution Exception on ${StateConstant[state]}`
        if (executionStage !== undefined) {
            errorMessage += ` when ${executionStage}`
        }
        super(errorMessage, innerException);
    }
}

export class InvocationException extends ExecutionException {
    constructor(state: StateConstant, innerException?: BaseException) {
        super(state, "Invocation", innerException);
    }
}

export class ChangeParamsException extends ExecutionException {
    constructor(state: StateConstant, innerException?: BaseException) {
        super(state, "ChangeParams", innerException);
    }
}

export class ChangeContextException extends ExecutionException {
    constructor(state: StateConstant, innerException?: BaseException) {
        super(state, "ChangeContext", innerException);
    }
}