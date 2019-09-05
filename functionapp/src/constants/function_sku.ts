import { UnexpectedConversion } from "../exceptions";

export enum FunctionSkuConstant {
    Consumption = 1,
    Dedicated,
    ElasticPremium
}

export class FunctionSkuUtil {
    public static FromString(sku: string) : FunctionSkuConstant {
        const skuLowercasedString: string = sku.toLowerCase();
        switch (skuLowercasedString) {
            case "consumption":
                return FunctionSkuConstant.Consumption;
            case "elasticpremium":
                return FunctionSkuConstant.ElasticPremium;
            default:
                return FunctionSkuConstant.Dedicated;
        }
    }
}