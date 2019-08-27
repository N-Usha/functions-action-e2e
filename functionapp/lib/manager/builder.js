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
            package: undefined
        };
    }
    static GetDefaultActionContext() {
        return {
            azureHttpUserAgent: undefined,
            isLinux: false,
            kind: undefined,
            resourceGroupName: undefined
        };
    }
}
exports.Builder = Builder;
