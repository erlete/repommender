from fastapi import FastAPI, Request

import os
import pickle
from time import perf_counter as pc

import nltk
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/fastapi/docs", openapi_url="/api/fastapi/openapi.json")

@app.get("/api/fastapi/hello")
def hello_fast_api():
    return {"message": "Hello FastAPI"}
