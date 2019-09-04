import * as core from "@actions/core";
import { BaseException, InvocationException } from "../exceptions";
import { IPrinter } from "../interfaces/IPrinter";
import { IActionParameters } from "../interfaces/IActionParameters";
import { IActionContext } from "../interfaces/IActionContext";
import { StateConstant } from "../constants/state";

export class Logger {
    public static PrintTraceback(be: BaseException, printer: IPrinter = core.error): void {
        be.PrintTraceback(printer);
    }

    public static Print(message: string) {
        console.log(message);
    }

    public static PrintCurrentState(
        state: StateConstant,
        printer: IPrinter = console.log
    ): void {
        printer(`##[${StateConstant[state]}]`);
    }

    public static PrintStateParameters(
        state: StateConstant,
        params: IActionParameters,
        printer: IPrinter = core.debug
    ): void {
        printer(`[${StateConstant[state]}] params`);
        for (let key in params) {
            printer(`  ${key} = ${params[key as keyof IActionParameters]}`);
        }
    }

    public static PrintStateContext(
        state: StateConstant,
        context: IActionContext,
        printer: IPrinter = core.debug
    ): void {
        printer(`[${StateConstant[state]}] context`);
        for (let key in context) {
            printer(`  ${key} = ${context[key as keyof IActionContext]}`);
        }
    }
}