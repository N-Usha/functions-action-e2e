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
const azure_app_service_1 = require("pipelines-appservice-lib/lib/ArmRest/azure-app-service");
const utility_js_1 = require("pipelines-appservice-lib/lib/Utilities/utility.js");
const ziputility_js_1 = require("pipelines-appservice-lib/lib/Utilities/ziputility.js");
const packageUtility_1 = require("pipelines-appservice-lib/lib/Utilities/packageUtility");
const AzureAppServiceUtility_1 = require("pipelines-appservice-lib/lib/RestUtilities/AzureAppServiceUtility");
const KuduServiceUtility_1 = require("pipelines-appservice-lib/lib/RestUtilities/KuduServiceUtility");
const state_1 = require("../constants/state");
const exceptions_1 = require("../exceptions");
const publish_method_1 = require("../constants/publish_method");
class ContentPreparer {
    invoke(state, params, context) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validatePackageType(state, context.package);
            this._appService = new azure_app_service_1.AzureAppService(context.endpoint, context.resourceGroupName, params.appName);
            this._appServiceUtil = new AzureAppServiceUtility_1.AzureAppServiceUtility(this._appService);
            this._kuduService = yield this._appServiceUtil.getKuduService();
            this._kuduServiceUtil = new KuduServiceUtility_1.KuduServiceUtility(this._kuduService);
            this._packageType = context.package.getPackageType();
            this._publishContentPath = yield this.generatePublishContent(state, params.packagePath, this._packageType);
            this._publishMethod = this.derivePublishMethod(state, this._packageType);
            try {
                this._kuduServiceUtil.warmpUp();
            }
            catch (expt) {
                throw new exceptions_1.AzureResourceError(state, "warmup", expt);
            }
            return state_1.StateConstant.PublishContent;
        });
    }
    changeContext(_0, _1, context) {
        return __awaiter(this, void 0, void 0, function* () {
            context.appService = this._appService;
            context.appServiceUtil = this._appServiceUtil;
            context.kuduService = this._kuduService;
            context.kuduServiceUtil = this._kuduServiceUtil;
            context.packageType = this._packageType;
            context.publishContentPath = this._publishContentPath;
            context.publishMethod = this._publishMethod;
            return context;
        });
    }
    validatePackageType(state, pkg) {
        const packageType = pkg.getPackageType();
        switch (packageType) {
            case packageUtility_1.PackageType.zip:
            case packageUtility_1.PackageType.folder:
                break;
            default:
                throw new exceptions_1.ValidationError(state, "validatePackageType", "only accepts zip or folder");
        }
    }
    generatePublishContent(state, packagePath, packageType) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (packageType) {
                case packageUtility_1.PackageType.zip:
                    return packagePath;
                case packageUtility_1.PackageType.folder:
                    const tempoaryFilePath = utility_js_1.generateTemporaryFolderOrZipPath(process.env.RUNNER_TEMP, false);
                    try {
                        return yield ziputility_js_1.archiveFolder(packagePath, "", tempoaryFilePath);
                    }
                    catch (expt) {
                        throw new exceptions_1.FileIOError(state, `archiving ${packagePath}`, expt);
                    }
                default:
                    throw new exceptions_1.ValidationError(state, "generatePublishContent", "only accepts zip or folder");
            }
        });
    }
    derivePublishMethod(state, packageType) {
        switch (packageType) {
            case packageUtility_1.PackageType.zip:
            case packageUtility_1.PackageType.folder:
                return publish_method_1.PublishMethodConstant.ZipDeploy;
            default:
                throw new exceptions_1.ValidationError(state, "derivePublishMethod", "only accepts zip or folder");
        }
    }
}
exports.ContentPreparer = ContentPreparer;
