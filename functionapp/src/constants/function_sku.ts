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
            case "dynamic":
                return FunctionSkuConstant.Consumption;
            case "dedicated":
                return FunctionSkuConstant.Dedicated;
            case "standard":
                return FunctionSkuConstant.Dedicated;
            case "premium":
                return FunctionSkuConstant.ElasticPremium;
            case "elasticpremium":
                return FunctionSkuConstant.ElasticPremium;
            default:
                throw new UnexpectedConversion("FunctionSkuConstant", sku);
        }
    }
}