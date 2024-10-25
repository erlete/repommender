"""Profiles table setup script.

This script is used to generate a simulated profiles table for the database.
It is not completely fail-safe, as it integrates an external download (Kaggle
dataset "colinmorris/reddit-usernames") and relies on the availability of the
dataset and the dataset's structure.

Author:
    Paulo Sanchez (@erlete)
"""

import random
from typing import Any
import kagglehub
import pandas as pd
import os


def run(config: dict[str, Any]) -> None:
    """Perform module tasks."""
    # Download dataset, sanitize, trim and format dataframe:
    print("Downloading usernames dataset...")
    path = os.path.join(
        kagglehub.dataset_download("paulosnchezerlete/repommender"), "users.csv"
    )
    print("Sanitizing, trimming and formatting usernames dataset...")
    usernames_df = pd.read_csv(path)
    usernames_df = (
        usernames_df.iloc[:, 0]
        .dropna()
        .head(min(config["profiles-table"]["user-count"], len(usernames_df)))
        .str.lower()
    )

    def generate_random_row(count: int) -> pd.DataFrame:
        """Generate a random row for the users table.

        Args:
            index (int): Index of the row to generate.
            count (int): Total number of profiles to generate.

        Returns:
            list: List containing the username, a list of random languages, a list
                of random interests, a random country, and a random age.
        """
        languages = config["interactions-table"]["random-generation"]["languages"]
        interests = config["interactions-table"]["random-generation"]["interests"]
        countries = config["interactions-table"]["random-generation"]["countries"]
        age = config["interactions-table"]["random-generation"]["age"]

        data = {
            "username": [usernames_df.iloc[i] for i in range(count)],
            "languages": [
                random.sample(
                    languages,
                    k=random.randint(
                        2,
                        int(len(languages) * 0.75),
                    ),
                )
                for _ in range(count)
            ],
            "interests": [
                random.sample(
                    interests,
                    k=random.randint(
                        5,
                        int(len(interests) * 0.75),
                    ),
                )
                for _ in range(count)
            ],
            "country": [random.choice(countries) for _ in range(count)],
            "age": [
                random.randint(
                    age["min"],
                    age["max"],
                )
                for _ in range(count)
            ],
        }
        return pd.DataFrame(
            data, columns=["username", "languages", "interests", "country", "age"]
        )

    # Create target dataframe and populate it with random data:
    print("Generating users...")
    users_data = generate_random_row(len(usernames_df))

    print(" Generated users ".center(80, "="))
    print(users_data.head(10))
    print(f" Total users: {len(users_data)} ".center(80, "="))

    # Save dataframe to CSV file:
    print("Saving users table as CSV...")
    users_data.to_csv("data/simulated-db/profiles-table.csv", index=False)
