"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationHandlerFactory_1 = require("pipelines-appservice-lib/lib/AuthorizationHandlerFactory");
const AzureResourceFilterUtility_1 = require("pipelines-appservice-lib/lib/RestUtilities/AzureResourceFilterUtility");
const state_1 = require("../constants/state");
const exceptions_1 = require("../exceptions");
const azure_app_service_1 = require("pipelines-appservice-lib/lib/ArmRest/azure-app-service");
const AzureAppServiceUtility_1 = require("pipelines-appservice-lib/lib/RestUtilities/AzureAppServiceUtility");
const KuduServiceUtility_1 = require("pipelines-appservice-lib/lib/RestUtilities/KuduServiceUtility");
const function_sku_1 = require("../constants/function_sku");
const configuration_1 = require("../constants/configuration");
const runtime_stack_1 = require("../constants/runtime_stack");
const function_runtime_1 = require("../constants/function_runtime");
class ResourceValidator {
    invoke(state, params) {
        return __awaiter(this, void 0, void 0, function* () {
            this._endpoint = AuthorizationHandlerFactory_1.getHandler();
            yield this.getResourceDetails(state, this._endpoint, params.appName);
            this._appService = new azure_app_service_1.AzureAppService(this._endpoint, this._resourceGroupName, params.appName);
            this._appServiceUtil = new AzureAppServiceUtility_1.AzureAppServiceUtility(this._appService);
            this._kuduService = yield this._appServiceUtil.getKuduService();
            this._kuduServiceUtil = new KuduServiceUtility_1.KuduServiceUtility(this._kuduService);
            this._sku = yield this.getFunctionappSku(state, this._appService);
            this._appSettings = yield this.getFunctionappSettings(state, this._appService);
            return state_1.StateConstant.ValidateFunctionappSettings;
        });
    }
    changeContext(state, _1, context) {
        return __awaiter(this, void 0, void 0, function* () {
            context.isLinux = this._isLinux;
            context.kind = this._kind;
            context.resourceGroupName = this._resourceGroupName;
            context.endpoint = this._endpoint;
            context.appService = this._appService;
            context.appServiceUtil = this._appServiceUtil;
            context.kuduService = this._kuduService;
            context.kuduServiceUtil = this._kuduServiceUtil;
            context.appSettings = this._appSettings;
            context.os = this._isLinux ? runtime_stack_1.RuntimeStackConstant.Linux : runtime_stack_1.RuntimeStackConstant.Windows;
            context.sku = this._sku;
            context.language = function_runtime_1.FunctionRuntimeUtil.FromString(this._appSettings.FUNCTIONS_WORKER_RUNTIME);
            this.validateRuntimeSku(state, context);
            this.validateLanguage(state, context);
            return context;
        });
    }
    getResourceDetails(state, endpoint, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            const appDetails = yield AzureResourceFilterUtility_1.AzureResourceFilterUtility.getAppDetails(endpoint, appName);
            if (appDetails === undefined) {
                throw new exceptions_1.ValidationError(state, "app-name", "function app should exist");
            }
            this._resourceGroupName = appDetails["resourceGroupName"];
            this._kind = appDetails["kind"];
            this._isLinux = this._kind.indexOf('linux') >= 0;
        });
    }
    getFunctionappSku(state, appService) {
        return __awaiter(this, void 0, void 0, function* () {
            let configSettings;
            try {
                configSettings = yield appService.get(true);
            }
            catch (expt) {
                throw new exceptions_1.AzureResourceError(state, 'Get Function App SKU', 'Failed to get site config', expt);
            }
            if (configSettings === undefined || configSettings.properties === undefined) {
                throw new exceptions_1.AzureResourceError(state, 'Get Function App SKU', 'Function app sku should not be empty');
            }
            return function_sku_1.FunctionSkuUtil.FromString(configSettings.properties.sku);
        });
    }
    getFunctionappSettings(state, appService) {
        return __awaiter(this, void 0, void 0, function* () {
            let appSettings;
            try {
                appSettings = yield appService.getApplicationSettings(true);
            }
            catch (expt) {
                throw new exceptions_1.AzureResourceError(state, 'Get Function App Settings', 'Failed to acquire app settings', expt);
            }
            if (appSettings === undefined || appSettings.properties === undefined) {
                throw new exceptions_1.AzureResourceError(state, 'Get Function App Settings', 'Function app settings shoud not be empty');
            }
            const result = {
                AzureWebJobsStorage: appSettings.properties['AzureWebJobsStorage'],
                FUNCTIONS_WORKER_RUNTIME: appSettings.properties['FUNCTIONS_WORKER_RUNTIME']
            };
            return result;
        });
    }
    validateRuntimeSku(state, context) {
        // Linux Elastic Premium is not supported
        if (context.os === runtime_stack_1.RuntimeStackConstant.Linux && context.sku === function_sku_1.FunctionSkuConstant.ElasticPremium) {
            throw new exceptions_1.ValidationError(state, configuration_1.ConfigurationConstant.ParamInFunctionSku, "Linux ElasticPremium plan is not yet supported");
        }
    }
    validateLanguage(state, context) {
        // Windows Python is not supported
        if (context.os === runtime_stack_1.RuntimeStackConstant.Windows) {
            if (context.language === function_runtime_1.FunctionRuntimeConstant.Python) {
                throw new exceptions_1.ValidationError(state, configuration_1.ConfigurationConstant.ParamInFunctionRuntime, "Python Function App on Windows is not yet supported");
            }
        }
        // Linux Java and Linux Powershell is not supported
        if (context.os === runtime_stack_1.RuntimeStackConstant.Linux) {
            if (context.language === function_runtime_1.FunctionRuntimeConstant.Java) {
                throw new exceptions_1.ValidationError(state, configuration_1.ConfigurationConstant.ParamInFunctionRuntime, "Java Function App on Linux is not yet supported");
            }
            if (context.language === function_runtime_1.FunctionRuntimeConstant.Powershell) {
                throw new exceptions_1.ValidationError(state, configuration_1.ConfigurationConstant.ParamInFunctionRuntime, "PowerShell Function App on Windows is not yet supported");
            }
        }
    }
}
exports.ResourceValidator = ResourceValidator;