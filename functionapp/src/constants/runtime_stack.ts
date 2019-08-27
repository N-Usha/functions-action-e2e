export enum RuntimeStackConstants {
    Windows = 1,
    Linux
}

export class RuntimeStackUtil {
    public static FromString(osType: string) : RuntimeStackConstants {
        const key: string = osType.charAt(0).toUpperCase() + osType.toLowerCase().slice(1);
        return RuntimeStackConstants[key as keyof typeof RuntimeStackConstants];
    }
}