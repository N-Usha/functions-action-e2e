"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Builder {
    static GetDefaultActionParameters() {
        return {
            appName: undefined,
            functionRuntime: undefined,
            runtimeStack: undefined,
            packagePath: undefined,
            sku: undefined
        };
    }
    static GetDefaultActionContext() {
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
        };
    }
}
exports.Builder = Builder;
