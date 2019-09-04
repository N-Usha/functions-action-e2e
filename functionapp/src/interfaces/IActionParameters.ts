import { FunctionRuntimeConstant } from '../constants/function_runtime';
import { RuntimeStackConstant } from '../constants/runtime_stack';
import { FunctionSkuConstant } from '../constants/function_sku';

export interface IActionParameters {
    appName: string;
    runtimeStack: RuntimeStackConstant;
    functionRuntime: FunctionRuntimeConstant;
    sku: FunctionSkuConstant;
    packagePath: string;
}