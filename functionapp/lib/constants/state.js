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
    // Validate and zip content
    StateConstant[StateConstant["PreparePublishContent"] = 4] = "PreparePublishContent";
    // Publish content to Azure Functionapps
    StateConstant[StateConstant["PublishContent"] = 5] = "PublishContent";
    // Validate if the content has been published successfully
    StateConstant[StateConstant["ValidatePublishedContent"] = 6] = "ValidatePublishedContent";
    // End state with success
    StateConstant[StateConstant["Succeed"] = 7] = "Succeed";
    // End state with failure
    StateConstant[StateConstant["Fail"] = 8] = "Fail";
    // End state with neutral
    StateConstant[StateConstant["Neutral"] = 9] = "Neutral";
})(StateConstant = exports.StateConstant || (exports.StateConstant = {}));
