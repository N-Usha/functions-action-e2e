"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeStackConstants;
(function (RuntimeStackConstants) {
    RuntimeStackConstants[RuntimeStackConstants["Windows"] = 1] = "Windows";
    RuntimeStackConstants[RuntimeStackConstants["Linux"] = 2] = "Linux";
})(RuntimeStackConstants = exports.RuntimeStackConstants || (exports.RuntimeStackConstants = {}));
class RuntimeStackUtil {
    static FromString(osType) {
        const key = osType.charAt(0).toUpperCase() + osType.toLowerCase().slice(1);
        return RuntimeStackConstants[key];
    }
}
exports.RuntimeStackUtil = RuntimeStackUtil;
