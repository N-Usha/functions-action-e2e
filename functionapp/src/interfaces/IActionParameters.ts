import { FunctionRuntimeConstant } from '../constants/function_runtime';
import { RuntimeStackConstant } from '../constants/runtime_stack';

export interface IActionParameters {
    appName: string;
    runtimeStack: RuntimeStackConstant;
    functionRuntime: FunctionRuntimeConstant;
    packagePath: string;
}