import { AzureAppService } from "pipelines-appservice-lib/lib/ArmRest/azure-app-service";
import { generateTemporaryFolderOrZipPath } from 'pipelines-appservice-lib/lib/Utilities/utility.js';
import { archiveFolder } from 'pipelines-appservice-lib/lib/Utilities/ziputility.js';
import { PackageType, Package } from "pipelines-appservice-lib/lib/Utilities/packageUtility";
import { Kudu } from "pipelines-appservice-lib/lib/KuduRest/azure-app-kudu-service";
import { AzureAppServiceUtility } from "pipelines-appservice-lib/lib/RestUtilities/AzureAppServiceUtility";
import { KuduServiceUtility } from "pipelines-appservice-lib/lib/RestUtilities/KuduServiceUtility";
import { IOrchestratable } from "../interfaces/IOrchestratable";
import { StateConstant } from "../constants/state";
import { IActionContext } from "../interfaces/IActionContext";
import { IActionParameters } from "../interfaces/IActionParameters";
import { ValidationError, FileIOError, AzureResourceError } from "../exceptions";
import { PublishMethodConstant } from "../constants/publish_method";

export class ContentPreparer implements IOrchestratable {
    private _appService: AzureAppService;
    private _appServiceUtil: AzureAppServiceUtility;
    private _kuduService: Kudu;
    private _kuduServiceUtil: KuduServiceUtility;
    private _packageType: PackageType;
    private _publishContentPath: string;
    private _publishMethod: PublishMethodConstant;

    public async invoke(state: StateConstant, params: IActionParameters, context: IActionContext): Promise<StateConstant> {
        this.validatePackageType(state, context.package);
        this._appService = new AzureAppService(context.endpoint, context.resourceGroupName, params.appName);
        this._appServiceUtil = new AzureAppServiceUtility(this._appService);
        this._kuduService = await this._appServiceUtil.getKuduService();
        this._kuduServiceUtil = new KuduServiceUtility(this._kuduService);
        this._packageType = context.package.getPackageType();
        this._publishContentPath = await this.generatePublishContent(state, params.packagePath, this._packageType);
        this._publishMethod = this.derivePublishMethod(state, this._packageType);

        try {
            this._kuduServiceUtil.warmpUp();
        } catch (expt) {
            throw new AzureResourceError(state, "warmup", expt as string);
        }

        return StateConstant.PublishContent;
    }

    public async changeContext(_0: StateConstant, _1: IActionParameters, context: IActionContext): Promise<IActionContext> {
        context.appService = this._appService;
        context.appServiceUtil = this._appServiceUtil;
        context.kuduService = this._kuduService;
        context.kuduServiceUtil = this._kuduServiceUtil;
        context.packageType = this._packageType;
        context.publishContentPath = this._publishContentPath;
        context.publishMethod = this._publishMethod;
        return context;
    }

    private validatePackageType(state: StateConstant, pkg: Package): void {
        const packageType: PackageType = pkg.getPackageType();
        switch (packageType) {
            case PackageType.zip:
            case PackageType.folder:
                break;
            default:
                throw new ValidationError(state, "validatePackageType", "only accepts zip or folder");
        }
    }

    private async generatePublishContent(state: StateConstant, packagePath: string, packageType: PackageType): Promise<string> {
        switch (packageType) {
            case PackageType.zip:
                return packagePath;
            case PackageType.folder:
                const tempoaryFilePath: string = generateTemporaryFolderOrZipPath(process.env.RUNNER_TEMP, false);
                try {
                    return await archiveFolder(packagePath, "", tempoaryFilePath) as string;
                } catch (expt) {
                    throw new FileIOError(state, `archiving ${packagePath}`, expt as string);
                }
            default:
                throw new ValidationError(state, "generatePublishContent", "only accepts zip or folder");
        }
    }

    private derivePublishMethod(state: StateConstant, packageType: PackageType): PublishMethodConstant {
        switch(packageType) {
            case PackageType.zip:
            case PackageType.folder:
                return PublishMethodConstant.ZipDeploy;
            default:
                throw new ValidationError(state, "derivePublishMethod", "only accepts zip or folder");
        }
    }
}