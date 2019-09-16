import logging

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "AWESOME",
        status_code=200
    )
