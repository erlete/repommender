"""FastAPI index module.

This module contains the FastAPI index. It is responsible for the definition
of the FastAPI application and API endpoints.

Author:
    Paulo Sanchez (@erlete)
"""

import random
import string
from fastapi import FastAPI

from api.interesting_repositories import get_interesting_repositories
from api.popular_repositories import get_popular_repositories
from api.request_models import (
    AuthenticatedRequestModel,
    InterestingRepositoriesRequest,
    PopularRepositoriesRequest,
    SimilarRepositoriesRequest,
    SimilarUsersRequest,
    TokenRequest,
)
from api.similar_repositories import get_similar_repositories
from api.similar_users import get_similar_users


app = FastAPI(docs_url="/api/fastapi/docs", openapi_url="/api/fastapi/openapi.json")


@app.post("/api/fastapi/auth/get-token")
def get_token_ep(request: TokenRequest):
    """Get token endpoint.

    Note:
        This endpoint is simulated and does not actually authenticate users.

    Args:
        request (TokenRequest): The request model.
    """
    try:
        return {
            "token": "".join(random.choices(string.ascii_letters + string.digits, k=32))
        }
    except Exception as e:
        return {"error": str(e)}


@app.post("/api/fastapi/auth/renew-token")
def renew_token_ep(request: AuthenticatedRequestModel):
    """Renew token endpoint.

    Note:
        This endpoint is simulated and does not actually renew tokens.

    Args:
        request (AuthenticatedRequest): The request model.
    """
    try:
        return {
            "token": "".join(random.choices(string.ascii_letters + string.digits, k=32))
        }
    except Exception as e:
        return {"error": str(e)}


@app.post("/api/fastapi/recommendations/get-popular-repositories")
def get_popular_repositories_ep(request: PopularRepositoriesRequest):
    """Get popular repositories endpoint.

    Args:
        request (PopularRepositoriesRequest): The request model.
    """
    try:
        return {"items": get_popular_repositories(request.count, request.language)}
    except Exception as e:
        return {"error": str(e)}


@app.post("/api/fastapi/recommendations/get-similar-repositories")
def get_similar_repositories_ep(request: SimilarRepositoriesRequest):
    """Get similar repositories endpoint.

    Args:
        request (SimilarRepositoriesRequest): The request model.
    """
    try:
        return {"items": get_similar_repositories(request.repository_id, request.count)}
    except Exception as e:
        return {"error": str(e)}


@app.post("/api/fastapi/recommendations/get-similar-users")
def get_similar_users_ep(request: SimilarUsersRequest):
    """Get similar users endpoint.

    Args:
        request (SimilarUsersRequest): The request model.
    """
    try:
        return {
            "items": get_similar_users(
                request.languages,
                request.interests,
                request.country,
                request.age,
                request.count,
            )
        }
    except Exception as e:
        return {"error": str(e)}


@app.post("/api/fastapi/recommendations/get-interesting-repositories")
def get_interesting_repositories_ep(request: InterestingRepositoriesRequest):
    """Get interesting repositories endpoint.

    Args:
        request (InterestingRepositoriesRequest): The request model.
    """
    try:
        return {"items": get_interesting_repositories(request.user_ids, request.count)}
    except Exception as e:
        return {"error": str(e)}
