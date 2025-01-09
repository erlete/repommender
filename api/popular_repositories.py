"""Popular repositories recommendation system definition module.

Author:
    Paulo Sanchez (@erlete)
"""

import pandas as pd
from api.config import INPUT_FILE


def get_popular_repositories(count: int, language: str | None) -> list[int]:
    """Get `count` popular repositories, optionally filtered by `language`.

    Args:
        count (int): Number of similar repositories to return.
        language (str | None): Language to filter repositories

    Returns:
        list[int]: List of most popular repository IDs.
    """
    ORIGINAL_DATA = pd.read_csv(INPUT_FILE)
    ORIGINAL_DATA = ORIGINAL_DATA.dropna(
        subset=["name", "description", "stargazers_count"]
    )

    if language is not None:
        filtered_data = ORIGINAL_DATA[ORIGINAL_DATA["language"] == language]
    else:
        filtered_data = ORIGINAL_DATA

    top_repositories = filtered_data.nlargest(count, "stargazers_count")

    return top_repositories.index.tolist()
