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
const packageUtility_1 = require("pipelines-appservice-lib/lib/Utilities/packageUtility");
const state_1 = require("../constants/state");
const exceptions_1 = require("../exceptions");
const runtime_stack_1 = require("../constants/runtime_stack");
const function_runtime_1 = require("../constants/function_runtime");
class ParameterHandler {
    invoke() {
        this._appName = core.getInput("app-name");
        this._runtimeStack = core.getInput("runtime-stack");
        this._functionRuntime = core.getInput("function-runtime");
        this._package = core.getInput("package");
        return state_1.StateConstant.ValidateAzureResource;
    }
    changeParams(state) {
        this.performValidation(state);
        const result = {
            appName: this._appName,
            runtimeStack: runtime_stack_1.RuntimeStackUtil.FromString(this._runtimeStack),
            functionRuntime: function_runtime_1.FunctionRuntimeUtil.FromString(this._functionRuntime),
            package: this._package
        };
        return result;
    }
    performValidation(state) {
        // app-name
        if (this._appName === undefined || this._appName.trim() === "") {
            throw new exceptions_1.ValidationError(state, "app-name", "should not be empty");
        }
        // runtime-stack
        if (this._runtimeStack === undefined || this._runtimeStack.trim() === "") {
            throw new exceptions_1.ValidationError(state, "runtime-stack", "should not be empty");
        }
        if (runtime_stack_1.RuntimeStackUtil.FromString(this._runtimeStack) === undefined) {
            throw new exceptions_1.ValidationError(state, "runtime-stack", "can only be 'windows' or 'linux'");
        }
        // function-runtime
        if (this._functionRuntime === undefined || this._functionRuntime.trim() === "") {
            throw new exceptions_1.ValidationError(state, "function-runtime", "should not be empty");
        }
        if (function_runtime_1.FunctionRuntimeUtil.FromString(this._functionRuntime) === undefined) {
            throw new exceptions_1.ValidationError(state, "function-runtime", "can only be 'dotnet', 'powershell', 'java', 'python' or 'node'");
        }
        // package
        if (this._package === undefined || this._package.trim() === "") {
            throw new exceptions_1.ValidationError(state, "package", "should not be empty");
        }
        if (!packageUtility_1.exist(this._package)) {
            throw new exceptions_1.ValidationError(state, "package", "needs to be in the project");
        }
    }
}
exports.ParameterHandler = ParameterHandler;
