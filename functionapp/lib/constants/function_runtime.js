"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionRuntimeConstants;
(function (FunctionRuntimeConstants) {
    FunctionRuntimeConstants[FunctionRuntimeConstants["Dotnet"] = 1] = "Dotnet";
    FunctionRuntimeConstants[FunctionRuntimeConstants["Node"] = 2] = "Node";
    FunctionRuntimeConstants[FunctionRuntimeConstants["Powershell"] = 3] = "Powershell";
    FunctionRuntimeConstants[FunctionRuntimeConstants["Java"] = 4] = "Java";
    FunctionRuntimeConstants[FunctionRuntimeConstants["Python"] = 5] = "Python";
})(FunctionRuntimeConstants = exports.FunctionRuntimeConstants || (exports.FunctionRuntimeConstants = {}));
class FunctionRuntimeUtil {
    static FromString(language) {
        const key = language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
        return FunctionRuntimeConstants[key];
    }
}
exports.FunctionRuntimeUtil = FunctionRuntimeUtil;
