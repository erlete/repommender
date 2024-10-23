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

nltk.download("punkt", quiet=True)
nltk.download("punkt_tab", quiet=True)
nltk.download("stopwords", quiet=True)

INPUT_FILE = "./data/merged_22_10_2024.csv"
PREPROCESS_CACHE_FILE = (
    f"./data/{INPUT_FILE.split('/')[-1].split('.')[0]}_preprocessed_cache.pkl"
)
REVALIDATE = True
STOPS = set(stopwords.words("english"))
PORTER_STEMMER = PorterStemmer()


def get_recommendations(content: str):
    ORIGINAL_DATA = pd.read_csv(INPUT_FILE)[:1250]
    ORIGINAL_DATA = ORIGINAL_DATA.dropna(subset=["name", "description"])

    if content not in ORIGINAL_DATA["name"].values:
        return []

    if os.path.exists(PREPROCESS_CACHE_FILE) and not REVALIDATE:
        with open(PREPROCESS_CACHE_FILE, "rb") as f:
            preprocessed_text = pickle.load(f)
    else:
        preprocessed_text = [
            " ".join(
                [
                    PORTER_STEMMER.stem(word)
                    for word in word_tokenize(row[5])
                    if not word in STOPS and word.isalnum()
                ]
            )
            for row in ORIGINAL_DATA.itertuples()
        ]

        with open(PREPROCESS_CACHE_FILE, "wb") as f:
            pickle.dump(preprocessed_text, f)

    preprocessed_data = ORIGINAL_DATA
    preprocessed_data["processed_text"] = preprocessed_text

    bag_of_words_model = TfidfVectorizer()
    bag_of_words_model.fit(preprocessed_data["processed_text"])

    texts_bag_of_words = bag_of_words_model.transform(
        preprocessed_data["processed_text"]
    )

    # Fit the TF-IDF model and transform the data
    bag_of_words_model = TfidfVectorizer()
    bag_of_words_model.fit(preprocessed_data["processed_text"])
    texts_bag_of_words = bag_of_words_model.transform(
        preprocessed_data["processed_text"]
    )

    distance_matrix = pairwise_distances(
        texts_bag_of_words, texts_bag_of_words, metric="cosine"
    )

    searchTitle = content  # Película base para las recomendaciones
    indexOfTitle = preprocessed_data[
        preprocessed_data["name"] == searchTitle
    ].index.values[0]

    distance_scores = list(enumerate(distance_matrix[indexOfTitle]))

    ordered_scores = sorted(distance_scores, key=lambda x: x[1])

    top_scores = ordered_scores[1:11]

    top_indexes = [i[0] for i in top_scores]

    return preprocessed_data.index[top_indexes].tolist()
