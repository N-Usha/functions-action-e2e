"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PublishMethodConstant;
(function (PublishMethodConstant) {
    // Using api/zipdeploy endpoint in scm site
    PublishMethodConstant[PublishMethodConstant["ZipDeploy"] = 1] = "ZipDeploy";
    // Setting WEBSITE_RUN_FROM_PACKAGE app setting
    PublishMethodConstant[PublishMethodConstant["WebsiteRunFromPackage"] = 2] = "WebsiteRunFromPackage";
})(PublishMethodConstant = exports.PublishMethodConstant || (exports.PublishMethodConstant = {}));
