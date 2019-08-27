export enum FunctionRuntimeConstant {
    Dotnet = 1,
    Node,
    Powershell,
    Java,
    Python
}

export class FunctionRuntimeUtil {
    public static FromString(language: string) : FunctionRuntimeConstant {
        const key: string = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
        return FunctionRuntimeConstant[key as keyof typeof FunctionRuntimeConstant];
    }
}