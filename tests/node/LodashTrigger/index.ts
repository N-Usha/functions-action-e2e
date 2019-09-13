import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as _ from "lodash";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.res = {
        status: 200,
        body: `Lodash Random Number Generator: ${_.random(0.0, 1.0, true)}`
    };
};

export default httpTrigger;
