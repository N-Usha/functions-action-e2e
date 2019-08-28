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
            packagePath: undefined
        }
    }

    public static GetDefaultActionContext(): IActionContext {
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
        }
    }
}