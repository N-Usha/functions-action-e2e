"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const state_1 = require("../constants/state");
class Logger {
    static PrintTraceback(be, printer = core.error) {
        be.PrintTraceback(printer);
    }
    static Print(message) {
        console.log(message);
    }
    static PrintCurrentState(state, printer = console.log) {
        printer(`##[${state_1.StateConstant[state]}]`);
    }
    static PrintStateParameters(state, params, printer = core.debug) {
        printer(`[${state_1.StateConstant[state]}] params`);
        for (let key in params) {
            printer(`  ${key} = ${params[key]}`);
        }
    }
    static PrintStateContext(state, context, printer = core.debug) {
        printer(`[${state_1.StateConstant[state]}] context`);
        for (let key in context) {
            printer(`  ${key} = ${context[key]}`);
        }
    }
}
exports.Logger = Logger;
