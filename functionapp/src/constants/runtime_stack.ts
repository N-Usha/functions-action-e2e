export enum RuntimeStackConstant {
    Windows = 1,
    Linux
}

export class RuntimeStackUtil {
    public static FromString(osType: string) : RuntimeStackConstant {
        const key: string = osType.charAt(0).toUpperCase() + osType.toLowerCase().slice(1);
        return RuntimeStackConstant[key as keyof typeof RuntimeStackConstant];
    }
}