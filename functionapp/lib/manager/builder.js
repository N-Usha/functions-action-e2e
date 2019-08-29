"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_runtime_1 = require("../constants/function_runtime");
const runtime_stack_1 = require("../constants/runtime_stack");
class Builder {
    static GetDefaultActionParameters() {
        return {
            appName: undefined,
            functionRuntime: function_runtime_1.FunctionRuntimeConstant.Dotnet,
            runtimeStack: runtime_stack_1.RuntimeStackConstant.Windows,
            packagePath: undefined
        };
    }
    static GetDefaultActionContext() {
        return {
            azureHttpUserAgent: undefined,
            isLinux: false,
            kind: undefined,
            resourceGroupName: undefined,
            appService: undefined,
            appServiceUtil: undefined,
            deploymentId: undefined,
            endpoint: undefined,
            kuduService: undefined,
            kuduServiceUtil: undefined,
            package: undefined,
            packageType: undefined,
            publishContentPath: undefined,
            publishMethod: undefined
        };
    }
}
exports.Builder = Builder;
