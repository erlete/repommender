from fastapi import FastAPI

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/fastapi/docs", openapi_url="/api/fastapi/openapi.json")

import kagglehub


@app.get("/api/fastapi/hello")
def hello_fast_api():
    # Download latest version
    path = kagglehub.dataset_download("unidatapro/crowd-counting")

    print("Path to dataset files:", path)

    return {"message": "Hello FastAPI" + path}
