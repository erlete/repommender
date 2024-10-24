"""Profiles table setup script.

This script is used to generate a simulated profiles table for the database.
It is not completely fail-safe, as it integrates an external download (Kaggle
dataset "colinmorris/reddit-usernames") and relies on the availability of the
dataset and the dataset's structure.

Author:
    Paulo Sanchez (@erlete)
"""

import random
import kagglehub
import pandas as pd
import os


def run() -> None:
    """Perform module tasks."""

    # Download dataset, sanitize, trim and format dataframe:
    print("Downloading usernames dataset...")
    path = os.path.join(
        kagglehub.dataset_download("paulosnchezerlete/repommender"), "users.csv"
    )
    print("Sanitizing, trimming and formatting usernames dataset...")
    usernames_df = pd.read_csv(path).iloc[:, 0].dropna().head(10000).str.lower()

    def generate_random_row(index: int) -> list[str | list[str] | int]:
        """Generate a random row for the users table.

        Args:
            index (int): Index of the row to generate.

        Returns:
            list: List containing the username, a list of random languages, a list
                of random interests, a random country, and a random age.
        """
        LANGUAGES = [
            "Python",
            "TypeScript",
            "JavaScript",
            "Java",
            "C++",
            "C#",
            "Ruby",
            "Go",
            "Swift",
            "Kotlin",
            "PHP",
            "Rust",
        ]

        INTERESTS = [
            "Algorithms",
            "Data Science",
            "Computer Science",
            "Machine Learning",
            "Deep Learning",
            "Web Development",
            "Mobile Development",
            "Game Development",
            "Cybersecurity",
            "Cloud Computing",
            "DevOps",
            "AI",
            "Blockchain",
            "IoT",
            "AR/VR",
            "Big Data",
            "Quantum Computing",
            "Networking",
            "Databases",
            "UI/UX",
        ]

        COUNTRIES = ["Spain", "USA", "Germany", "India", "Canada"]

        return [
            usernames_df.iloc[index],
            random.sample(LANGUAGES, k=random.randint(2, 8)),
            random.sample(INTERESTS, k=random.randint(5, 12)),
            random.choice(COUNTRIES),
            random.randint(18, 75),
        ]

    # Create target dataframe and populate it with random data:
    print("Generating users...")
    users_data = pd.DataFrame(
        [],
        columns=["username", "languages", "interests", "country", "age"],
    )
    for i in range(len(usernames_df)):
        users_data.loc[len(users_data)] = generate_random_row(i)

    print(" Generated users ".center(80, "="))
    print(users_data.head(10))
    print(f"Total users: {len(users_data)}")

    # Save dataframe to CSV file:
    print("Saving users table as CSV...")
    users_data.to_csv("data/simulated-db/profiles-table.csv", index=False)
