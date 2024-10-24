import pandas as pd


def get_row_similarity(original, compared):
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


def get_similarities(
    languages: list[str], interests: list[str], country: str, age: int
) -> list[str]:
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
    original_user = users_data.iloc[0]
    similarities = users_data.apply(
        lambda row: get_row_similarity(original_user, row), axis=1
    )
    most_similar_users = similarities.sort_values(ascending=False).head(10)

    # Exclude the original user from the most similar users
    similar_users_with_similarity = users_data.loc[most_similar_users.index].copy()
    similar_users_with_similarity = similar_users_with_similarity[
        similar_users_with_similarity.index != original_user.name
    ]
    similar_users_with_similarity["similarity"] = most_similar_users[
        similar_users_with_similarity.index
    ].values

    return similar_users_with_similarity["username"].tolist()
