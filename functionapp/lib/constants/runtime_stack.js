"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeStackConstant;
(function (RuntimeStackConstant) {
    RuntimeStackConstant[RuntimeStackConstant["Windows"] = 1] = "Windows";
    RuntimeStackConstant[RuntimeStackConstant["Linux"] = 2] = "Linux";
})(RuntimeStackConstant = exports.RuntimeStackConstant || (exports.RuntimeStackConstant = {}));
class RuntimeStackUtil {
    static FromString(osType) {
        const key = osType.charAt(0).toUpperCase() + osType.toLowerCase().slice(1);
        return RuntimeStackConstant[key];
    }
}
exports.RuntimeStackUtil = RuntimeStackUtil;
