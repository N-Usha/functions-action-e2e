export enum StateConstant {
    // State when initialize Github Action
    Initialize = 1,

    // Get & Check the parameter from action.yml
    ValidateParameter,

    // Get & Check if the resources does exist
    ValidateAzureResource,

    // Check if the Github project matches Azure's os-type and language
    ValidateFunctionappSettings,

    // Zip content and choose the proper deployment method
    PreparePublishContent,

    // Publish content to Azure Functionapps
    PublishContent,

    // Validate if the content has been published successfully
    ValidatePublishedContent,

    // End state with success
    Succeed,

    // End state with failure
    Fail,

    // End state with neutral
    Neutral
}