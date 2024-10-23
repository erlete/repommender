from fastapi import FastAPI
from .recommender import get_recommendations
from typing import Optional
from fastapi import Query

app = FastAPI(docs_url="/api/fastapi/docs", openapi_url="/api/fastapi/openapi.json")


@app.get("/api/fastapi/get-recommendations")
def get_recommendations_endpoint(content: Optional[str] = Query(None)):
    if content is None:
        return {"recommendations": []}

    try:
        return {"recommendations": get_recommendations(content)}
    except Exception:
        return {"recommendations": []}
