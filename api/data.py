"""Data processing methods' definition module.

Author:
    Paulo Sanchez (@erlete)
"""

import pandas as pd


def get_repository_summary(repository_id: int):
    """Get the summarized data fields of a repository.

    This method looks up a repository by its ID and retrieves a summary of its
    data fields, including: name, author, author image url, language used, url,
    and GitHub stars.

    Args:
        repository_id (int): The ID of the repository to get the summary for.

    Returns:
        dict: A dictionary containing the repository's summary data.
    """
    ORIGINAL_DATA = pd.read_csv("data/simulated-db/repositories-table.csv")
    repository = ORIGINAL_DATA.iloc[repository_id]

    return {
        "name": repository["name"],
        "author": repository["owner"],
        "author_image_url": f"https://github.com/{repository['owner']}.png",
        "language": repository["language"],
        "url": repository["html_url"],
        "stars": int(repository["stargazers_count"]),
    }


def get_repository_info(repository_id: int):
    """Get detailed information of a repository.

    This method looks up a repository by its ID and retrieves detailed
    information, including all the fields from the summary and additional
    fields such as description, creation date, and last modification date.

    Args:
        repository_id (int): The ID of the repository to get the information for.

    Returns:
        dict: A dictionary containing the repository's detailed information.
    """
    ORIGINAL_DATA = pd.read_csv("data/simulated-db/repositories-table.csv")
    repository = ORIGINAL_DATA.iloc[repository_id]

    output = {
        "description": repository["description"],
        "creation_date": repository["created_at"],
        "last_modification_date": repository["updated_at"],
    }

    output.update(get_repository_summary(repository_id))

    return output
