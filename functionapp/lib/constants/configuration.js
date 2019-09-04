"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationConstant {
}
ConfigurationConstant.ParamInAppName = 'app-name';
ConfigurationConstant.ParamInRuntimeStack = 'runtime-stack';
ConfigurationConstant.ParamInFunctionRuntime = 'function-runtime';
ConfigurationConstant.ParamInPackagePath = 'package';
ConfigurationConstant.ParamInFunctionSku = 'sku';
ConfigurationConstant.ParamOutResultName = 'functionapp-url';
ConfigurationConstant.DefaultFunctionSku = 'dedicated';
ConfigurationConstant.DefaultPackagePath = '.';
ConfigurationConstant.EnvAzureHttpUserAgent = 'AZURE_HTTP_USER_AGENT';
ConfigurationConstant.ActionName = 'functionapp';
ConfigurationConstant.BlobContainerName = 'github-actions-deploy';
ConfigurationConstant.BlobNamePrefix = 'Functionapp';
ConfigurationConstant.BlobServiceTimeoutMs = 3 * 1000;
ConfigurationConstant.BlobUploadTimeoutMs = 30 * 60 * 1000;
ConfigurationConstant.BlobUploadBlockSizeByte = 4 * 1024 * 1024;
ConfigurationConstant.BlobUplaodBlockParallel = 4;
ConfigurationConstant.BlobPermission = 'r';
exports.ConfigurationConstant = ConfigurationConstant;
