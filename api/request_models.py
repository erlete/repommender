"""Request models for the backend API.

This module contains all necessary request models for the backend API. These
models are used to validate the request payloads and provide a consistent
interface for the backend API.

Author:
    Paulo Sanchez (@erlete)
"""

from typing import Optional
from pydantic import BaseModel, Field


class TokenRequest(BaseModel):
    """Token request model.

    This request model is used to request a token to the backend API by
    providing the API key that authenticates the user.

    Attributes:
        api_key (str): API key.
    """

    api_key: str = Field(..., description="API key to authenticate the user.")


class AuthenticatedRequestModel(BaseModel):
    """Authenticated request model.

    This request model represents an authenticated request to the backend API,
    containing the user token. All other content requests should inherit from
    this model.

    Args:
        token (str): User token.
    """

    token: str = Field(..., description="User token.")


class MultipleItemsRequestModel(BaseModel):
    """Multiple items request model.

    This request model is used to request multiple items from the backend API.
    It should be used as a base class for all requests that return multiple
    items.

    Args:
        count (int): Number of items to return.
    """

    count: int = Field(..., description="Number of items to return.")


class PopularRepositoriesRequest(AuthenticatedRequestModel, MultipleItemsRequestModel):
    """Popular repositories request model.

    This request model is used to request `count` popular repositories from the
    backend API, optionally filtering by `language`.

    Args:
        count (int): Number of repositories to return.
        language (Optional[str]): Language to filter repositories
    """

    language: Optional[str] = Field(
        None, description="Language to filter repositories by."
    )


class SimilarRepositoriesRequest(AuthenticatedRequestModel, MultipleItemsRequestModel):
    """Similar repositories request model.

    This request model is used to request `count` repositories similar to the
    repository with ID `repository_id`.

    Args:
        repository_id (int): Repository ID.
        count (int): Number of repositories to return.
    """

    repository_id: int = Field(..., description="Repository ID.")


class SimilarUsersRequest(AuthenticatedRequestModel, MultipleItemsRequestModel):
    """Similar users request model.

    This request model is used to request `count` users similar to the user with
    ID `user_id`.

    Args:
        user_id (int): User ID.
        count (int): Number of users to return.
    """

    languages: list[str] = Field(..., description="List of languages.")
    interests: list[str] = Field(..., description="List of interests.")
    country: str = Field(..., description="Country.")
    age: int = Field(..., description="Age.")


class InterestingRepositoriesRequest(
    AuthenticatedRequestModel, MultipleItemsRequestModel
):
    """Interesting repositories request model.

    This request model is used to request interesting repositories for the users
    with IDs `user_ids`.

    Args:
        user_ids (list[int]): List of user IDs.
        count (int): Number of repositories to return.
    """

    user_ids: list[int] = Field(..., description="List of user IDs.")


class RepositoryDataRequest(AuthenticatedRequestModel):
    """Repository data request model.

    This request model is used to request the data of a repository with ID
    `repository_id`.

    Args:
        repository_id (int): Repository ID.
    """

    repository_id: int = Field(..., description="Repository ID.")
