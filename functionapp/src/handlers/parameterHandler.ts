import * as core from '@actions/core';
import { exist } from 'pipelines-appservice-lib/lib/Utilities/packageUtility'
import { IOrchestratable } from '../interfaces/IOrchestratable';
import { StateConstant } from '../constants/state';
import { IActionParameters } from '../interfaces/IActionParameters';
import { ValidationError } from '../exceptions';
import { RuntimeStackUtil } from '../constants/runtime_stack';
import { FunctionRuntimeUtil } from '../constants/function_runtime';

export class ParameterHandler implements IOrchestratable {
    private _appName: string;
    private _runtimeStack: string;
    private _functionRuntime: string;
    private _package: string;

    public invoke(): StateConstant {
        this._appName = core.getInput("app-name");
        this._runtimeStack = core.getInput("runtime-stack");
        this._functionRuntime = core.getInput("function-runtime");
        this._package = core.getInput("package");
        return StateConstant.ValidateAzureResource;
    }

    public changeParams(state: StateConstant): IActionParameters {
        this.performValidation(state);
        const result: IActionParameters = {
            appName: this._appName,
            runtimeStack: RuntimeStackUtil.FromString(this._runtimeStack),
            functionRuntime: FunctionRuntimeUtil.FromString(this._functionRuntime),
            package: this._package
        };
        return result;
    }

    private performValidation(state: StateConstant): void {
        // app-name
        if (this._appName === undefined || this._appName.trim() === "") {
            throw new ValidationError(state, "app-name", "should not be empty");
        }

        // runtime-stack
        if (this._runtimeStack === undefined || this._runtimeStack.trim() === "") {
            throw new ValidationError(state, "runtime-stack", "should not be empty");
        }

        if (RuntimeStackUtil.FromString(this._runtimeStack) === undefined) {
            throw new ValidationError(state, "runtime-stack", "can only be 'windows' or 'linux'");
        }

        // function-runtime
        if (this._functionRuntime === undefined || this._functionRuntime.trim() === "") {
            throw new ValidationError(state, "function-runtime", "should not be empty");
        }

        if (FunctionRuntimeUtil.FromString(this._functionRuntime) === undefined) {
            throw new ValidationError(state, "function-runtime",
                "can only be 'dotnet', 'powershell', 'java', 'python' or 'node'");
        }

        // package
        if (this._package === undefined || this._package.trim() === "") {
            throw new ValidationError(state, "package", "should not be empty");
        }

        if (!exist(this._package)) {
            throw new ValidationError(state, "package", "needs to be in the project");
        }
    }
}