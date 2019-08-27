export enum FunctionRuntimeConstants {
    Dotnet = 1,
    Node,
    Powershell,
    Java,
    Python
}

export class FunctionRuntimeUtil {
    public static FromString(language: string) : FunctionRuntimeConstants {
        const key: string = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
        return FunctionRuntimeConstants[key as keyof typeof FunctionRuntimeConstants];
    }
}