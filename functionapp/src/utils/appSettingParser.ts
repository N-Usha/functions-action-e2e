import { UnexpectedConversion } from "../exceptions";


export class AppSettingParser {
    public static getAzureWebjobsStorage(azureWebjobsStorage:string): { [key: string]: string } {
        const result: { [key: string]: string } = {};
        azureWebjobsStorage.trim().split(';').map(entry => {
            const keyValue: string = entry.trim();
            const delimeterIndex: number = keyValue.indexOf('=');
            if (delimeterIndex === -1) {
                throw new UnexpectedConversion('AzureWebjobsStorage', entry);
            }

            const key: string = keyValue.substring(0, delimeterIndex);
            const value: string = keyValue.substring(delimeterIndex + 1);
            result[key] = value;
        });
        return result
    }
}