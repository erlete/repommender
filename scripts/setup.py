"""Python backend logic and data setup script.

This script is used to check that all the required dependencies are installed
and to set up the database with the necessary tables and data.

Author:
    Paulo Sanchez (@erlete)
"""

import os
import sys

# Ensure that the Python version is 3.10 or higher:
if sys.version_info.major > 3 and sys.version_info.minor >= 10:
    print("This script requires Python 3.10 or higher.")
    exit(1)

# Ensure that required dependencies are installed:
try:
    import pandas
    import kagglehub
    import numpy
    import scipy
    import sklearn
except ImportError as exc:
    print(f"An error occurred while importing a required dependency: {exc}")
    print("Please make sure that all the required dependencies are installed.")
    exit(1)

# Ensure that this script is run from the correct directory:
if not (os.path.exists("app") and os.path.isdir("app")):
    print(
        "Please run this script from the project's root directory (the one"
        + ' containing the "app" directory).'
    )
    exit(1)

# Ensure that required directories exist:
#   (data/simulated-db, data/simulated-cache)
os.makedirs("data/simulated-db", exist_ok=True)
os.makedirs("data/simulated-cache", exist_ok=True)

# Set up the database:
from setup_profiles_table import run as setup_profiles_table
from setup_repositories_table import run as setup_repositories_table

print("Setting up the database...")
setup_profiles_table()
setup_repositories_table()

print("Setup complete.")
