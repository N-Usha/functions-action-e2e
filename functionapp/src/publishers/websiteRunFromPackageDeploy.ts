import { AzureAppService } from 'pipelines-appservice-lib/lib/ArmRest/azure-app-service';
import { BlobURL, BlockBlobURL, Pipeline, uploadFileToBlockBlob, generateBlobSASQueryParameters } from '@azure/storage-blob';
import { SharedKeyCredential, ServiceURL, StorageURL, ContainerURL, Aborter, IBlobSASSignatureValues } from '@azure/storage-blob';
import { StateConstant } from '../constants/state';
import { IActionContext } from '../interfaces/IActionContext';
import { IStorageAccount } from '../interfaces/IStorageAccount';
import { AppSettingParser } from '../utils/appSettingParser';
import { ConfigurationConstant } from '../constants/configuration';
import { ValidationError, AzureResourceError } from '../exceptions';


export class WebsiteRunFromPackageDeploy {
    public static async execute(state: StateConstant, context: IActionContext) {
        const storage: IStorageAccount = await this.findStorageAccount(state, context.appService);
        const blobServiceCredential: SharedKeyCredential = new SharedKeyCredential(storage.AccountName, storage.AccountKey);
        const blobServicePipeline: Pipeline = StorageURL.newPipeline(blobServiceCredential, {
            retryOptions: {
                maxTries: 3
            }
        });
        const blobServiceUrl: ServiceURL = new ServiceURL(
            `https://${storage.AccountName}.blob.core.windows.net`,
            blobServicePipeline
        );
        const containerUrl: ContainerURL = await this.createBlobContainerIfNotExists(state, blobServiceUrl);
        const blobName: string = this.createBlobName();
        const blobUrl: BlobURL = await this.uploadBlobFromFile(state, containerUrl, blobName, context.publishContentPath);
        const blobSasParams: string = this.getBlobSasQueryParams(blobName, blobServiceCredential);
        await this.publishToFunctionapp(state, context.appService, `${blobUrl.url}${blobSasParams}`);
    }

    private static async findStorageAccount(state: StateConstant, appService: AzureAppService): Promise<IStorageAccount> {
        const appSettings = await appService.getApplicationSettings();
        let storageData: IStorageAccount;
        if (appSettings && appSettings.properties && appSettings.properties.AzureWebJobsStorage) {
            let dictionary: { [key: string]: string };
            try {
                dictionary = AppSettingParser.getAzureWebjobsStorage(appSettings.properties.AzureWebJobsStorage);
            } catch (expt) {
                throw new ValidationError(state, 'AzureWebjobsStorage', 'Failed to convert by semicolon delimeter', expt);
            }

            storageData = {
                AccountKey: dictionary["AccountKey"],
                AccountName: dictionary["AccountName"]
            };
        } else {
            throw new ValidationError(state, 'AzureWebjobsStorage', 'it is required by function app');
        }

        if (!storageData.AccountKey || !storageData.AccountName) {
            throw new ValidationError(state, 'AzureWebjobsStorage', 'Failed to fetch AccountKey or AccountName');
        }

        return storageData;
    }

    private static async createBlobContainerIfNotExists(state: StateConstant, blobServiceUrl: ServiceURL): Promise<ContainerURL> {
        const containerURL = ContainerURL.fromServiceURL(blobServiceUrl, ConfigurationConstant.BlobContainerName);
        let response = await containerURL.getProperties(Aborter.timeout(ConfigurationConstant.BlobServiceTimeoutMs));
        if (response.errorCode === "404") {
            response = await containerURL.create(Aborter.timeout(ConfigurationConstant.BlobServiceTimeoutMs));
        }
        if (response.errorCode) {
            throw new AzureResourceError(state, "Create Blob Container", `Failed with ${response.errorCode} requestId: ${response.requestId}`);
        }
        return containerURL;
    }

    private static createBlobName(): string {
        const now: Date = new Date();
        const time: string = `${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}${now.getUTCHours()}${now.getUTCMinutes()}${now.getUTCSeconds()}`;
        return `${ConfigurationConstant.BlobNamePrefix}_${time}.zip`;
    }

    private static async uploadBlobFromFile(state: StateConstant, containerUrl: ContainerURL, blobName:string, filePath: string): Promise<BlobURL> {
        // Upload blob to storage account
        const blobURL: BlobURL = BlobURL.fromContainerURL(containerUrl, blobName);
        const blockBlobURL: BlockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
        try {
            uploadFileToBlockBlob(Aborter.timeout(ConfigurationConstant.BlobUploadTimeoutMs), filePath, blockBlobURL, {
                blockSize: ConfigurationConstant.BlobUploadBlockSizeByte,
                parallelism: ConfigurationConstant.BlobUplaodBlockParallel,
            });
        } catch (expt) {
            throw new AzureResourceError(state, "Upload File to Blob", `Failed when uploading ${filePath}`, expt);
        }
        return blockBlobURL;
    }

    private static getBlobSasQueryParams(blobName: string, credential: SharedKeyCredential): string {
        const now: Date = new Date();
        const startTime: Date = new Date();
        startTime.setMinutes(now.getMinutes() - 5);
        const expiryTime: Date = new Date();
        expiryTime.setFullYear(now.getFullYear() + 1);

        const blobSasValues: IBlobSASSignatureValues = {
            blobName: blobName,
            containerName: ConfigurationConstant.BlobContainerName,
            startTime: startTime,
            expiryTime: expiryTime,
            permissions: ConfigurationConstant.BlobPermission
        }
        return generateBlobSASQueryParameters(blobSasValues, credential).toString();
    }

    private static async publishToFunctionapp(state: StateConstant, appService: AzureAppService, blobSasUrl: string) {
        try {
            await appService.patchApplicationSettings({
                'WEBSITE_RUN_FROM_PACKAGE': blobSasUrl
            });
        } catch (expt) {
            throw new AzureResourceError(state, "Patch Application Settings",
                `Failed to set WEBSITE_RUN_FROM_PACKAGE with ${blobSasUrl}`);
        }

        try {
            await appService.syncFunctionTriggers();
        } catch (expt) {
            throw new AzureResourceError(state, "Sync Trigger Functionapp",
                `Failed to perform sync trigger on function app`);
        }
    }
}