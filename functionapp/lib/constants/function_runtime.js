"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return FunctionRuntimeConstant[key];
    }
}
exports.FunctionRuntimeUtil = FunctionRuntimeUtil;
