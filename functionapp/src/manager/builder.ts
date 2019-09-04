import { IActionParameters } from "../interfaces/IActionParameters";
import { FunctionRuntimeConstant } from "../constants/function_runtime";
import { RuntimeStackConstant } from "../constants/runtime_stack";
import { IActionContext } from "../interfaces/IActionContext";
import { FunctionSkuConstant } from "../constants/function_sku";

export class Builder {
    public static GetDefaultActionParameters(): IActionParameters {
        return {
            appName: undefined,
            functionRuntime: undefined,
            runtimeStack: undefined,
            packagePath: undefined,
            sku: undefined
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