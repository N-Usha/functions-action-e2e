import { StateConstant } from './constants/state';

class BaseException extends Error {
    private _inner_exception: BaseException

    constructor(
        message: string = undefined,
        inner_exception: BaseException = undefined
    ) {
        super();
        super.message = message ? message : "";
        this._inner_exception = inner_exception ? inner_exception : null;
    }

    public GetInnerException(): BaseException {
        return this._inner_exception;
    }
}

export class NotImplementedException extends BaseException {
}

export class UnexpectedExitException extends BaseException {
    constructor(state: StateConstant = StateConstant.Neutral) {
        super(StateConstant[state]);
    }
}