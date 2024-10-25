"""Interactions table setup script.

This script is used to generate a simulated interactions table for the database.
It reads from the profiles and repositories tables and generates random interactions.

Author:
    Paulo Sanchez (@erlete)
"""

import random
import pandas as pd
import os
from datetime import datetime, timedelta


def run(config: dict[str, dict[str, int]]) -> None:
    """Perform module tasks."""
    # Read profiles and repositories tables:
    print("Reading profiles and repositories tables...")
    profiles_path = "data/simulated-db/profiles-table.csv"
    repositories_path = "data/simulated-db/repositories-table.csv"

    profiles_df = pd.read_csv(profiles_path)
    repositories_df = pd.read_csv(repositories_path)

    usernames = profiles_df["username"].tolist()
    repositories = repositories_df["full_name"].tolist()

    def generate_random_rows(count: int) -> pd.DataFrame:
        """Generate a DataFrame of random rows for the interactions table.

        Args:
            count (int): Number of rows to generate.

        Returns:
            pd.DataFrame: DataFrame containing the generated rows.
        """
        data = {
            "username": [random.choice(usernames) for _ in range(count)],
            "repository": [random.choice(repositories) for _ in range(count)],
            "like": [random.choice([-1, 0, 1]) for _ in range(count)],
            "date": [
                (datetime.now() - timedelta(days=random.randint(0, 30))).strftime(
                    "%Y-%m-%d"
                )
                for _ in range(count)
            ],
            "time_spent": [random.randint(2, 900) for _ in range(count)],
        }

        return pd.DataFrame(
            data, columns=["username", "repository", "like", "date", "time_spent"]
        )

    # Create target dataframe and populate it with random data:
    print("Generating interactions...")
    interactions_data = generate_random_rows(
        config["interactions-table"]["interaction-count"]
    )

    print(" Generated interactions ".center(80, "="))
    print(interactions_data.head(10))
    print(f" Total interactions: {len(interactions_data)} ".center(80, "="))

    # Save dataframe to CSV file:
    print("Saving interactions table as CSV...")
    interactions_data.to_csv("data/simulated-db/interactions-table.csv", index=False)
