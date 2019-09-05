import { UnexpectedConversion } from '../exceptions';

export enum FunctionRuntimeConstant {
    None = 1, // V1 function app does not have FUNCTIONS_WORKER_RUNTIME
    Dotnet,
    Node,
    Powershell,
    Java,
    Python,
}

export class FunctionRuntimeUtil {
    public static FromString(language: string) : FunctionRuntimeConstant {
        const key: string = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
        const result: FunctionRuntimeConstant = FunctionRuntimeConstant[key as keyof typeof FunctionRuntimeConstant];
        if (result === undefined) {
            return FunctionRuntimeConstant.None
        }
        return result;
    }
}