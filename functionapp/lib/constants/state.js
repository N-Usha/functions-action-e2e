"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateConstant;
(function (StateConstant) {
    // State when initialize Github Action
    StateConstant[StateConstant["Initialize"] = 1] = "Initialize";
    // Get & Check the parameter from action.yml
    StateConstant[StateConstant["ValidateParameter"] = 2] = "ValidateParameter";
    // Get & Check if the resources does exist
    StateConstant[StateConstant["ValidateAzureResource"] = 3] = "ValidateAzureResource";
    // Check if the Github project matches Azure's os-type and language
    StateConstant[StateConstant["ValidateFunctionappSettings"] = 4] = "ValidateFunctionappSettings";
    // Zip content and choose the proper deployment method
    StateConstant[StateConstant["PreparePublishContent"] = 5] = "PreparePublishContent";
    // Publish content to Azure Functionapps
    StateConstant[StateConstant["PublishContent"] = 6] = "PublishContent";
    // Validate if the content has been published successfully
    StateConstant[StateConstant["ValidatePublishedContent"] = 7] = "ValidatePublishedContent";
    // End state with success
    StateConstant[StateConstant["Succeed"] = 8] = "Succeed";
    // End state with failure
    StateConstant[StateConstant["Fail"] = 9] = "Fail";
    // End state with neutral
    StateConstant[StateConstant["Neutral"] = 10] = "Neutral";
})(StateConstant = exports.StateConstant || (exports.StateConstant = {}));
