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
const storage_blob_1 = require("@azure/storage-blob");
const storage_blob_2 = require("@azure/storage-blob");
const appSettingParser_1 = require("../utils/appSettingParser");
const configuration_1 = require("../constants/configuration");
const exceptions_1 = require("../exceptions");
class WebsiteRunFromPackageDeploy {
    static execute(state, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const storage = yield this.findStorageAccount(state, context.appService);
            const blobServiceCredential = new storage_blob_2.SharedKeyCredential(storage.AccountName, storage.AccountKey);
            const blobServicePipeline = storage_blob_2.StorageURL.newPipeline(blobServiceCredential);
            const blobServiceUrl = new storage_blob_2.ServiceURL(`https://${storage.AccountName}.blob.core.windows.net`, blobServicePipeline);
            const containerUrl = yield this.createBlobContainerIfNotExists(state, blobServiceUrl);
            const blobName = this.createBlobName();
            const blobUrl = yield this.uploadBlobFromFile(state, containerUrl, blobName, context.publishContentPath);
            const blobSasParams = this.getBlobSasQueryParams(blobName, blobServiceCredential);
            yield this.publishToFunctionapp(state, context.appService, `${blobUrl.url}${blobSasParams}`);
        });
    }
    static findStorageAccount(state, appService) {
        return __awaiter(this, void 0, void 0, function* () {
            const appSettings = yield appService.getApplicationSettings();
            let storageData;
            if (appSettings && appSettings.properties && appSettings.properties.AzureWebJobsStorage) {
                let dictionary;
                try {
                    dictionary = appSettingParser_1.AppSettingParser.getAzureWebjobsStorage(appSettings.properties.AzureWebJobsStorage);
                }
                catch (expt) {
                    throw new exceptions_1.ValidationError(state, 'AzureWebjobsStorage', 'Failed to convert by semicolon delimeter', expt);
                }
                storageData = {
                    AccountKey: dictionary["AccountKey"],
                    AccountName: dictionary["AccountName"]
                };
            }
            else {
                throw new exceptions_1.ValidationError(state, 'AzureWebjobsStorage', 'it is required by function app');
            }
            if (!storageData.AccountKey || !storageData.AccountName) {
                throw new exceptions_1.ValidationError(state, 'AzureWebjobsStorage', 'Failed to fetch AccountKey or AccountName');
            }
            return storageData;
        });
    }
    static createBlobContainerIfNotExists(state, blobServiceUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerURL = storage_blob_2.ContainerURL.fromServiceURL(blobServiceUrl, configuration_1.ConfigurationConstant.BlobContainerName);
            let response = yield containerURL.getProperties(storage_blob_2.Aborter.timeout(configuration_1.ConfigurationConstant.BlobServiceTimeoutMs));
            if (response.errorCode === "404") {
                response = yield containerURL.create(storage_blob_2.Aborter.timeout(configuration_1.ConfigurationConstant.BlobServiceTimeoutMs));
            }
            if (response.errorCode) {
                throw new exceptions_1.AzureResourceError(state, "Create Blob Container", `Failed with ${response.errorCode} requestId: ${response.requestId}`);
            }
            return containerURL;
        });
    }
    static createBlobName() {
        const now = new Date();
        const time = `${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}${now.getUTCHours()}${now.getUTCMinutes()}${now.getUTCSeconds()}`;
        return `${configuration_1.ConfigurationConstant.BlobNamePrefix}_${time}.zip`;
    }
    static uploadBlobFromFile(state, containerUrl, blobName, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Upload blob to storage account
            const blobURL = storage_blob_1.BlobURL.fromContainerURL(containerUrl, blobName);
            const blockBlobURL = storage_blob_1.BlockBlobURL.fromBlobURL(blobURL);
            try {
                storage_blob_1.uploadFileToBlockBlob(storage_blob_2.Aborter.timeout(configuration_1.ConfigurationConstant.BlobUploadTimeoutMs), filePath, blockBlobURL, {
                    blockSize: configuration_1.ConfigurationConstant.BlobUploadBlockSizeByte,
                    parallelism: configuration_1.ConfigurationConstant.BlobUplaodBlockParallel,
                });
            }
            catch (expt) {
                throw new exceptions_1.AzureResourceError(state, "Upload File to Blob", `Failed when uploading ${filePath}`, expt);
            }
            return blockBlobURL;
        });
    }
    static getBlobSasQueryParams(blobName, credential) {
        const now = new Date();
        const startTime = new Date();
        startTime.setMinutes(now.getMinutes() - 5);
        const expiryTime = new Date();
        expiryTime.setFullYear(now.getFullYear() + 1);
        const blobSasValues = {
            blobName: blobName,
            containerName: configuration_1.ConfigurationConstant.BlobContainerName,
            startTime: startTime,
            expiryTime: expiryTime,
            permissions: configuration_1.ConfigurationConstant.BlobPermission
        };
        return storage_blob_1.generateBlobSASQueryParameters(blobSasValues, credential).toString();
    }
    static publishToFunctionapp(state, appService, blobSasUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield appService.patchApplicationSettings({
                    'WEBSITE_RUN_FROM_PACKAGE': blobSasUrl
                });
            }
            catch (expt) {
                throw new exceptions_1.AzureResourceError(state, "Patch Application Settings", `Failed to set WEBSITE_RUN_FROM_PACKAGE with ${blobSasUrl}`);
            }
            try {
                yield appService.syncFunctionTriggers();
            }
            catch (expt) {
                throw new exceptions_1.AzureResourceError(state, "Sync Trigger Functionapp", `Failed to perform sync trigger on function app`);
            }
        });
    }
}
exports.WebsiteRunFromPackageDeploy = WebsiteRunFromPackageDeploy;
