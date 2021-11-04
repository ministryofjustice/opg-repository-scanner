import argparse
import os
import json
from pprint import pp

def readable_directory(directory:str):
    """
    Determine if the directory string path passed is readable
    """
    if not os.path.isdir(directory):
        raise ValueError(f"{directory} is not a directory")
    if not os.access(directory, os.R_OK):
        raise ValueError(f"{directory} is not readable")
    return directory

def string_to_bool(value:str) -> bool:
    """
    If the value passed looks like false, then return False, otherwise
    return True
    """
    if value.lower().strip() == "false":
        return False
    return True

def string_to_json_array(value:str):
    """
    Convert the string passed from a json array to a list
    """
    converted = json.loads(value)
    if type(converted) == list:
        return converted
    raise ValueError(f"Could not convert string to a json array")
