"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionSkuConstant;
(function (FunctionSkuConstant) {
    FunctionSkuConstant[FunctionSkuConstant["Consumption"] = 1] = "Consumption";
    FunctionSkuConstant[FunctionSkuConstant["Dedicated"] = 2] = "Dedicated";
    FunctionSkuConstant[FunctionSkuConstant["ElasticPremium"] = 3] = "ElasticPremium";
})(FunctionSkuConstant = exports.FunctionSkuConstant || (exports.FunctionSkuConstant = {}));
class FunctionSkuUtil {
    static FromString(sku) {
        const skuLowercasedString = sku.toLowerCase();
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
exports.FunctionSkuUtil = FunctionSkuUtil;
