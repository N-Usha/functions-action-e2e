import { UnexpectedConversion } from "../exceptions";


export class AppSettingParser {
    public static getAzureWebjobsStorage(azureWebjobsStorage:string): { [key: string]: string } {
        const result: { [key: string]: string } = {};
        azureWebjobsStorage.trim().split(';').map(entry => {
            const keyValue: Array<string> = entry.trim().split('=');
            if (keyValue.length !== 2) {
                throw new UnexpectedConversion('AzureWebjobsStorage', entry);
            }
            result[keyValue[0]] = keyValue[1];
        });
        return result
    }
}