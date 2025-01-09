"""Interesting repositories recommendation system definition module.

Author:
    Paulo Sanchez (@erlete)
"""

import pandas as pd


def get_interesting_repositories(user_indices: list[int], count: int) -> list[int]:
    """Get `count` interesting repositories for a list of users.

    This function retrieves the `count` most interesting repositories for a
    list of users based on their interactions. This is meant to be used after
    retrieving similar users to a given user.

    Args:
        user_indices (list[int]): The indices of the users to get repositories for.
        count (int): The number of interesting repositories to retrieve.

    Returns:
        list[int]: The indices of the `count` most interesting repositories.
    """
    # Load the profiles table
    profiles_df = pd.read_csv("data/simulated-db/profiles-table.csv")

    # Retrieve usernames based on user_indices
    usernames = profiles_df.iloc[user_indices]["username"].tolist()

    # Load the interactions table
    interactions_df = pd.read_csv("data/simulated-db/interactions-table.csv")

    # Filter the interactions for the first 20 entries of each username
    filtered_interactions = pd.DataFrame(
        columns=["username", "repository", "like", "date", "time_spent"]
    )
    for username in usernames:
        user_interactions = interactions_df[
            interactions_df["username"] == username
        ].head(50)
        filtered_interactions = pd.concat([filtered_interactions, user_interactions])

    print(filtered_interactions, len(filtered_interactions))

    # Create a new table with the required columns
    new_table = (
        filtered_interactions.groupby("repository")
        .agg(
            like_reduced=("like", "sum"),
            date=("date", "first"),
            time_spent=("time_spent", "sum"),
            occurrences=("repository", "size"),
        )
        .reset_index()
    )

    # Calculate the interest score
    max_likes = new_table["like_reduced"].max()
    max_time_spent = new_table["time_spent"].max()
    max_occurrences = new_table["occurrences"].max()

    new_table["interest"] = (
        (new_table["like_reduced"] / max_likes) * 0.4
        + (new_table["time_spent"] / max_time_spent) * 0.3
        + (new_table["occurrences"] / max_occurrences) * 0.3
    )

    # Drop the occurrences column as it's no longer needed
    new_table = new_table.drop(columns=["occurrences"])

    # Sort the new_table by the interest score in descending order
    new_table = new_table.sort_values(by="interest", ascending=False)

    # Load the repositories table
    repositories_df = pd.read_csv("data/simulated-db/repositories-table.csv")

    # Get the top 10 repositories based on the interest score
    top_repositories = new_table.head(count)

    # Retrieve the indices of these repositories in the repositories table
    top_repository_indices = repositories_df[
        repositories_df["full_name"].isin(top_repositories["repository"])
    ].index.tolist()

    return top_repository_indices
