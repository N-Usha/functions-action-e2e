import { IActionParameters } from "../interfaces/IActionParameters";
import { FunctionRuntimeConstants } from "../constants/function_runtime";
import { RuntimeStackConstants } from "../constants/runtime_stack";
import { IActionContext } from "../interfaces/IActionContext";

export class Builder {
    public static GetDefaultActionParameters(): IActionParameters {
        return {
            appName: undefined,
            functionRuntime: FunctionRuntimeConstants.Dotnet,
            runtimeStack: RuntimeStackConstants.Windows,
            package: undefined
        }
    }

    public static GetDefaultActionContext(): IActionContext {
        return {
            resourceGroupName: undefined
        }
    }
}