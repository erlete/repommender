from fastapi import FastAPI

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/fastapi/docs", openapi_url="/api/fastapi/openapi.json")


@app.get("/api/fastapi/hello")
def hello_fast_api():

    return {"message": "Hello FastAPI"}


# EI1aPUIlQ6I5K8AxWfOXRszTir5JZg3R9KFbLqHScAs
