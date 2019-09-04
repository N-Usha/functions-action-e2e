"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
class AppSettingParser {
    static getAzureWebjobsStorage(azureWebjobsStorage) {
        const result = {};
        azureWebjobsStorage.trim().split(';').map(entry => {
            const keyValue = entry.trim().split('=');
            if (keyValue.length !== 2) {
                throw new exceptions_1.UnexpectedConversion('AzureWebjobsStorage', azureWebjobsStorage);
            }
            result[keyValue[0]] = keyValue[1];
        });
        return result;
    }
}
exports.AppSettingParser = AppSettingParser;
