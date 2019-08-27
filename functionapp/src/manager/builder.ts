import { IActionParameters } from "../interfaces/IActionParameters";
import { FunctionRuntimeConstant } from "../constants/function_runtime";
import { RuntimeStackConstant } from "../constants/runtime_stack";
import { IActionContext } from "../interfaces/IActionContext";

export class Builder {
    public static GetDefaultActionParameters(): IActionParameters {
        return {
            appName: undefined,
            functionRuntime: FunctionRuntimeConstant.Dotnet,
            runtimeStack: RuntimeStackConstant.Windows,
            package: undefined
        }
    }

    public static GetDefaultActionContext(): IActionContext {
        return {
            azureHttpUserAgent: undefined,
            isLinux: false,
            kind: undefined,
            resourceGroupName: undefined
        }
    }
}