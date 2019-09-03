"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
var FunctionRuntimeConstant;
(function (FunctionRuntimeConstant) {
    FunctionRuntimeConstant[FunctionRuntimeConstant["Dotnet"] = 1] = "Dotnet";
    FunctionRuntimeConstant[FunctionRuntimeConstant["Node"] = 2] = "Node";
    FunctionRuntimeConstant[FunctionRuntimeConstant["Powershell"] = 3] = "Powershell";
    FunctionRuntimeConstant[FunctionRuntimeConstant["Java"] = 4] = "Java";
    FunctionRuntimeConstant[FunctionRuntimeConstant["Python"] = 5] = "Python";
})(FunctionRuntimeConstant = exports.FunctionRuntimeConstant || (exports.FunctionRuntimeConstant = {}));
class FunctionRuntimeUtil {
    static FromString(language) {
        const key = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
        const result = FunctionRuntimeConstant[key];
        if (result === undefined) {
            throw new exceptions_1.UnexpectedConversion("FunctionRuntimeConstant", language);
        }
        return result;
    }
}
exports.FunctionRuntimeUtil = FunctionRuntimeUtil;
