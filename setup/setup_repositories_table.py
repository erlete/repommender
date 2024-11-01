"""Profiles table setup script.

This script is used to generate a simulated profiles table for the database.

Author:
    Paulo Sanchez (@erlete)
"""

import kagglehub
import pandas as pd
import os


def run() -> None:
    """Perform module tasks."""
    print("Downloading repositories dataset...")
    path = os.path.join(
        kagglehub.dataset_download("paulosnchezerlete/repommender"),
        "repositories-table.csv",
    )

    print("Sanitizing repositories dataset...")
    repositories_df = pd.read_csv(path).dropna(subset=["name", "description"])

    print(" Generated repositories ".center(80, "="))
    print(repositories_df.head(10))
    print(f" Total repositories: {len(repositories_df)} ".center(80, "="))

    print("Saving repositories table as CSV...")
    repositories_df.to_csv("data/simulated-db/repositories-table.csv", index=False)

    print("Saving repositories table as JSON...")
    repositories_df.to_json(
        "data/simulated-db/repositories-table.json", orient="records"
    )
