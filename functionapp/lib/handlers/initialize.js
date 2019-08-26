"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../constants/state");
class InitializeHandler {
    invoke(currentState, params, context) {
        return state_1.StateConstant.Succeed;
    }
}
exports.InitializeHandler = InitializeHandler;
//# sourceMappingURL=initialize.js.map