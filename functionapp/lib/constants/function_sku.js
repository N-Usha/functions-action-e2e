"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
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
                throw new exceptions_1.UnexpectedConversion("FunctionSkuConstant", sku);
        }
    }
}
exports.FunctionSkuUtil = FunctionSkuUtil;
