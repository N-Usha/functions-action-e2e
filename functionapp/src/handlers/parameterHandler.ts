import * as core from '@actions/core';
import { exist, Package } from 'pipelines-appservice-lib/lib/Utilities/packageUtility'
import { IOrchestratable } from '../interfaces/IOrchestratable';
import { StateConstant } from '../constants/state';
import { IActionParameters } from '../interfaces/IActionParameters';
import { ValidationError } from '../exceptions';
import { RuntimeStackUtil, RuntimeStackConstant } from '../constants/runtime_stack';
import { FunctionRuntimeUtil, FunctionRuntimeConstant } from '../constants/function_runtime';
import { FunctionSkuUtil, FunctionSkuConstant } from '../constants/function_sku';
import { IActionContext } from '../interfaces/IActionContext';
import { ConfigurationConstant } from '../constants/configuration';


export class ParameterHandler implements IOrchestratable {
    private _appName: string;
    private _runtimeStack: string;
    private _functionRuntime: string;
    private _functionSku: string;
    private _packagePath: string;

    public async invoke(state: StateConstant): Promise<StateConstant> {
        this._appName = core.getInput(ConfigurationConstant.ParamInAppName);
        this._runtimeStack = core.getInput(ConfigurationConstant.ParamInRuntimeStack);
        this._functionRuntime = core.getInput(ConfigurationConstant.ParamInFunctionRuntime);
        this._packagePath = core.getInput(ConfigurationConstant.ParamInPackagePath);
        this._functionSku = core.getInput(ConfigurationConstant.ParamInFunctionSku);
        this.fillEmptyFields();
        this.validateFields(state);
        return StateConstant.ValidateAzureResource;
    }

    public async changeParams(state: StateConstant, params: IActionParameters): Promise<IActionParameters> {
        params.appName = this._appName;
        params.runtimeStack = RuntimeStackUtil.FromString(this._runtimeStack);
        params.functionRuntime = FunctionRuntimeUtil.FromString(this._functionRuntime);
        params.sku = FunctionSkuUtil.FromString(this._functionSku);
        params.packagePath = this._packagePath;
        this.validateRuntimeSku(state, params);
        this.validateLanguage(state, params);
        return params;
    }

    public async changeContext(_0: StateConstant, _1: IActionParameters, context: IActionContext): Promise<IActionContext> {
        context.package = new Package(this._packagePath);
        return context;
    }

    private fillEmptyFields(): void {
        if (this._functionSku === undefined || this._functionSku.trim() === "") {
            this._functionSku = ConfigurationConstant.DefaultFunctionSku;
        }

        if (this._packagePath === undefined || this._packagePath.trim() === "") {
            this._packagePath = ConfigurationConstant.DefaultPackagePath;
        }
    }

    private validateFields(state: StateConstant): void {
        // app-name
        if (this._appName === undefined || this._appName.trim() === "") {
            throw new ValidationError(state, ConfigurationConstant.ParamInAppName, "should not be empty");
        }

        // runtime-stack
        if (this._runtimeStack === undefined || this._runtimeStack.trim() === "") {
            throw new ValidationError(state, ConfigurationConstant.ParamInRuntimeStack, "should not be empty");
        }

        try {
            RuntimeStackUtil.FromString(this._runtimeStack);
        } catch (expt) {
            throw new ValidationError(state, ConfigurationConstant.ParamInRuntimeStack, "only accepts 'windows' or 'linux'", expt);
        }

        // function-runtime
        if (this._functionRuntime === undefined || this._functionRuntime.trim() === "") {
            throw new ValidationError(state, ConfigurationConstant.ParamInFunctionRuntime, "should not be empty");
        }

        try {
            FunctionRuntimeUtil.FromString(this._functionRuntime);
        } catch (expt) {
            throw new ValidationError(state, ConfigurationConstant.ParamInFunctionRuntime, "only accepts 'dotnet', 'powershell', 'java', 'python' or 'node'", expt);
        }

        // function-sku
        if (this._functionSku === undefined || this._functionSku.trim() === "") {
            throw new ValidationError(state, ConfigurationConstant.ParamInFunctionSku, "should not be empty");
        }

        try {
            FunctionSkuUtil.FromString(this._functionSku);
        } catch (expt) {
            throw new ValidationError(state, ConfigurationConstant.ParamInFunctionSku, "only accepts 'consumption', 'dedicated' or 'elasticpremium'", expt);
        }

        // package
        if (this._packagePath === undefined || this._packagePath.trim() === "") {
            throw new ValidationError(state, ConfigurationConstant.ParamInPackagePath, "should not be empty");
        }

        if (!exist(this._packagePath)) {
            throw new ValidationError(state, ConfigurationConstant.ParamInPackagePath, "needs to be in the project");
        }
    }

    private validateRuntimeSku(state: StateConstant, params: IActionParameters) {
        // Linux Elastic Premium is not supported
        if (params.runtimeStack === RuntimeStackConstant.Linux && params.sku === FunctionSkuConstant.ElasticPremium) {
            throw new ValidationError(state, ConfigurationConstant.ParamInFunctionSku,
                "Linux ElasticPremium plan is not yet supported");
        }
    }

    private validateLanguage(state: StateConstant, params: IActionParameters) {
        // Windows Python is not supported
        if (params.runtimeStack === RuntimeStackConstant.Windows) {
            if (params.functionRuntime === FunctionRuntimeConstant.Python) {
                throw new ValidationError(state, ConfigurationConstant.ParamInFunctionRuntime,
                    "Python Function App on Windows is not yet supported");
            }
        }

        // Linux Java and Linux Powershell is not supported
        if (params.runtimeStack === RuntimeStackConstant.Linux) {
            if (params.functionRuntime === FunctionRuntimeConstant.Java) {
                throw new ValidationError(state, ConfigurationConstant.ParamInFunctionRuntime,
                    "Java Function App on Linux is not yet supported");
            }

            if (params.functionRuntime === FunctionRuntimeConstant.Powershell) {
                throw new ValidationError(state, ConfigurationConstant.ParamInFunctionRuntime,
                    "PowerShell Function App on Windows is not yet supported");
            }
        }
    }
}