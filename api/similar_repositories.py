"""Similar repositories recommendation system definition module.

Author:
    Paulo Sanchez (@erlete)
"""

import os
import pickle

import pandas as pd
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances

from api.config import (
    INPUT_FILE,
    PORTER_STEMMER,
    PREPROCESS_CACHE_FILE,
    REVALIDATE,
    STOPS,
)


def get_similar_repositories(repository_id: int, count: int) -> list[int]:
    """Get `count` similar repositories to one with ID `repository_id`.

    Args:
        repository_id (int): Repository ID.
        count (int): Number of repositories to return.

    Returns:
        list[int]: List of similar repository IDs.
    """
    ORIGINAL_DATA = pd.read_csv(INPUT_FILE)
    ORIGINAL_DATA = ORIGINAL_DATA.dropna(subset=["name", "description"])

    # Fail safe in case the repository_id is out of bounds:
    if not 0 <= repository_id < len(ORIGINAL_DATA):
        return []

    # Data preprocessing (stemming, tokenization, stop words removal):
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

    # Fit the TF-IDF model and transform the data:
    bag_of_words_model = TfidfVectorizer()
    bag_of_words_model.fit(preprocessed_data["processed_text"])
    texts_bag_of_words = bag_of_words_model.transform(
        preprocessed_data["processed_text"]
    )

    distance_matrix = pairwise_distances(
        texts_bag_of_words, texts_bag_of_words, metric="cosine"
    )

    distance_scores = list(enumerate(distance_matrix[repository_id]))
    ordered_scores = sorted(distance_scores, key=lambda x: x[1])
    top_scores = ordered_scores[1 : count + 1]
    top_indexes = [i[0] for i in top_scores]

    return preprocessed_data.index[top_indexes].tolist()
