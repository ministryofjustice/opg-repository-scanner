import pytest
from pprint import pp
from reports import report
import os
from pathlib import Path
from inputs.validators import *
_ROOT_DIR = Path( os.path.dirname(__file__ ) + "/../../../" ).resolve()

def test_readable_directory_with_invalid_path():
    with pytest.raises(ValueError) as err:
        readable_directory("./not-a-directory")

def test_readable_directory_with_valid_path():
    dir = f"{_ROOT_DIR}/__samples"
    r = readable_directory(dir)
    pp(r)
    assert r == dir


POSSIBLE_STRING_BOOLEANS = [
        ("FALSE", False),
        ("False", False),
        ("FalSE", False),
        ("false", False),
        (" false  ", False),
        ("TRUE", True),
        ("True", True),
        ("TruE", True),
        ("true", True),
        (" true  ", True),
        ("", True),
        ("1", True),
        (" ", True)
    ]

@pytest.mark.parametrize('string_value,expected', POSSIBLE_STRING_BOOLEANS)
def test_string_to_bool_with_false_values(string_value, expected):
    assert string_to_bool(string_value) == expected



VALID_JSON_STRINGS = [
    ("[]", 0),
    ('[{"test":1}, {"name":"test"}]', 2)
]
@pytest.mark.parametrize('valid,length', VALID_JSON_STRINGS)
def test_json_string_to_list(valid, length):
    converted = json_string_to_list(valid)
    assert len(converted) == length

INVALID_JSON_STRINGS = [
    "",
    "{}"
]
@pytest.mark.parametrize('invalid', INVALID_JSON_STRINGS)
def test_json_string_to_list(invalid):
    with pytest.raises(ValueError) as err:
        json_string_to_list(invalid)
