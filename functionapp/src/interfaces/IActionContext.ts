import { Package, PackageType } from 'pipelines-appservice-lib/lib/Utilities/packageUtility';
import { IAuthorizationHandler } from 'pipelines-appservice-lib/lib/ArmRest/IAuthorizationHandler';
import { AzureAppService } from 'pipelines-appservice-lib/lib/ArmRest/azure-app-service';
import { AzureAppServiceUtility } from 'pipelines-appservice-lib/lib/RestUtilities/AzureAppServiceUtility';
import { Kudu } from 'pipelines-appservice-lib/lib/KuduRest/azure-app-kudu-service';
import { KuduServiceUtility } from 'pipelines-appservice-lib/lib/RestUtilities/KuduServiceUtility';
import { PublishMethodConstant } from '../constants/publish_method';

export interface IActionContext {
    azureHttpUserAgent: string;
    resourceGroupName: string;
    kind: string;
    isLinux: boolean;
    package: Package;
    packageType: PackageType;
    publishContentPath: string;
    publishMethod: PublishMethodConstant;
    deploymentId: string;

    endpoint: IAuthorizationHandler;
    appService: AzureAppService;
    appServiceUtil: AzureAppServiceUtility;
    kuduService: Kudu;
    kuduServiceUtil: KuduServiceUtility;
}
