import pandas as pd


def compute_user_similarity(original, compared):
    """Compute the similarity between two users.

    This function computes the similarity between two users based on their
    languages, interests, country, and age, each with a different weight.

    Args:
        original (pd.Series): The original user.
        compared (pd.Series): The compared user.

    Returns:
        float: The similarity between the two users.
    """
    return sum(
        key * value
        for key, value in {
            0.375: sum(item in compared["languages"] for item in original["languages"])
            / len(original["languages"]),
            0.375: sum(item in compared["interests"] for item in original["interests"])
            / len(original["interests"]),
            0.1: original["country"] == compared["country"],
            0.15: max(
                min(1 - abs(original["age"] - compared["age"]) / 50, 1),
                0,
            ),
        }.items()
    )


def get_similar_users(
    languages: list[str], interests: list[str], country: str, age: int, count: int
) -> list[str]:
    """Get `count` similar users to a given set of characteristics.

    This function retrieves the `count` most similar users to a given set of
    characteristics, including languages, interests, country, and age.

    Args:
        languages (list[str]): The languages spoken by the user.
        interests (list[str]): The interests of the user.
        country (str): The country of the user.
        age (int): The age of the user.
        count (int): The number of similar users to retrieve.

    Returns:
        list[str]: The list of `count` most similar users
    """
    # Read data from the simulated profiles table and preprocess it:
    users_data = pd.read_csv(
        "data/simulated-db/profiles-table.csv",
        header=0,
        converters={
            "age": int,
            "languages": lambda x: x.strip("[]").replace("'", "").split(", "),
            "interests": lambda x: x.strip("[]").replace("'", "").split(", "),
        },
    )

    # Sorted similarities table (it represents the indices on the main table):
    original_user = pd.Series(
        {"languages": languages, "interests": interests, "country": country, "age": age}
    )
    print(f"Original user:\n{original_user}")
    similarities = users_data.apply(
        lambda row: compute_user_similarity(original_user, row), axis=1
    )
    most_similar_users = similarities.sort_values(ascending=False).head(count)
    print("Most similar users with their similarity index:")
    for index, similarity in most_similar_users.items():
        print(f"User index: {index}, Similarity: {similarity}")

    # Exclude the original user from the most similar users
    similar_users_with_similarity = users_data.loc[most_similar_users.index].copy()
    similar_users_with_similarity = similar_users_with_similarity[
        similar_users_with_similarity.index != original_user.name
    ]
    similar_users_with_similarity["similarity"] = most_similar_users[
        similar_users_with_similarity.index
    ].values

    return similar_users_with_similarity.index.tolist()
