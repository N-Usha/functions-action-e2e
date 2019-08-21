export enum StateConstant {
    // State when initialize Github Action
    Initialize,

    // Check the parameter from action.yml
    ValidateParameter,

    // Check if the resources does exist
    ValidateAzureResource,

    // Validate and zip content
    PreparePublishContent,

    // Publish content to Azure Functionapps
    PublishContent,

    // Validate if the content has been published successfully
    ValidatePublishedContent,

    // End state with success
    Succeed,

    // End state with failure
    Fail
}