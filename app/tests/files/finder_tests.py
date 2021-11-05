import pytest
from pprint import pp

from files.finder import *


def test_patterns_with_prefix_simple():
    f = finder()
    patterns = f.patterns_with_prefix("../__samples", ["*.txt"])
    assert len(patterns) == 1
    assert patterns[0] == "../__samples/*.txt"



BASIC_VALID_PATHS = [
    ("../__samples/files/pip/app1", 1),
    ("../__samples/files/pip/app2", 2),
    ("../__samples/files/pip", 4)
]
@pytest.mark.parametrize('path,length', BASIC_VALID_PATHS)
def test_finder_find_basic_paths(path, length):
    f = finder()
    found = f.find(path, ["**/*.txt"])
    assert len(found) == length


def test_finder_find_removes_duplicates():
    f = finder()
    path = "../__samples/files/pip"
    # these patterns overlap, so this should only return required files
    patterns = ["**/*.txt", "app1/*.txt"]
    found = f.find(path, patterns)
    assert len(found) == 4


SIMPLE_EXCLUDES = [
    ( ["__tests__/test.py", "__tests__/test.txt", "main.py", "requirements.txt"], 1 ),
    ( ["__tests__/test.py", "__tests__/test.txt", "main.py", "README"], 2 ),
    ( [".git/config", "__tests__/test.txt", "main.py", "README", "__tests__.txt"], 3 ),
    ( ["sample", "sample/test", "_sample"], 1 ),
    ( ["sample", "sample/test"], 0 ),
    ( [], 0 )
]
@pytest.mark.parametrize('items,length', SIMPLE_EXCLUDES)
def test_finder_filter_simple(items, length):
    f = finder()
    exclude = [ "(__tests__/)", "(requirements.txt)", "(.git/*)", "^sample"]
    filtered = f.filter(exclude, items)
    assert len(filtered) == length


def test_finder_get_simple():
    f = finder()
    include = ["**/*.txt"]
    dir = "../__samples/files/pip"

    exclude = ["(app1/)"]
    found1 = f.get(dir, include, exclude)
    assert len(found1) == 3

    found2 = f.get(dir, include, [])
    assert len(found2) == 4
