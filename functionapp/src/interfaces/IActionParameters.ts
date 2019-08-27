import { FunctionRuntimeConstants } from '../constants/function_runtime';
import { RuntimeStackConstants } from '../constants/runtime_stack';

export interface IActionParameters {
    appName: string;
    runtimeStack: RuntimeStackConstants;
    functionRuntime: FunctionRuntimeConstants;
    package: string;
}