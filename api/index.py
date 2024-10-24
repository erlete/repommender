from fastapi import FastAPI
from .repository_recommender import get_repository_recommendations
from .user_similarities import get_similar_users
from pydantic import BaseModel


class SimilarUsersRequest(BaseModel):
    languages: list[str]
    interests: list[str]
    country: str
    age: int


app = FastAPI(docs_url="/api/fastapi/docs", openapi_url="/api/fastapi/openapi.json")


@app.get("/api/fastapi/get-recommended-repositories")
def get_recommended_repositories_ep(content: str):
    try:
        return {"items": get_repository_recommendations(content)}
    except Exception as exc:
        return {"error": f"A problem occurred: {exc}"}


@app.post("/api/fastapi/get-similar-users")
def get_similar_users_ep(request: SimilarUsersRequest):
    try:
        return {
            "items": get_similar_users(
                request.languages,
                request.interests,
                request.country,
                request.age,
            )
        }
    except Exception as exc:
        return {"error": f"A problem occurred: {exc}"}
