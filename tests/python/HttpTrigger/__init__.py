import logging

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "SHITJOUMUVIOPMEIJ",
        status_code=200
    )
