"""Configuration file for the API.

This file is responsible for storing the configuration variables for the API,
such as the database location, cache location and common functionality setups.

Author:
    Paulo Sanchez (@erlete)
"""

import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer


# NLTK resources download:
nltk.download("punkt", quiet=True)
nltk.download("punkt_tab", quiet=True)
nltk.download("stopwords", quiet=True)

# Configuration variables definition:
INPUT_FILE = "./data/simulated-db/repositories-table.csv"
PREPROCESS_CACHE_FILE = f"./data/simulated-cache/repositories-table-preprocessed.pkl"
REVALIDATE = False
STOPS = set(stopwords.words("english"))
PORTER_STEMMER = PorterStemmer()
