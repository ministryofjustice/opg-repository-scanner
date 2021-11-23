import pytest
from pprint import pp
from files.read import *
import os
from pathlib import Path
_ROOT_DIR = Path( os.path.dirname(__file__ ) + "/../../../" ).resolve()

PATHS = [
    (f"{_ROOT_DIR}/__samples/files/pip/app1/", False),
    (f"{_ROOT_DIR}/__samples/files/pip/app1/blah.txt", False),
    (f"{_ROOT_DIR}/__samples/files/pip/app1/requirements.txt", True)
]

@pytest.mark.parametrize('path,exists', PATHS)
def test_read_is_file(path, exists):
    r = read()
    assert r.is_file(path) == exists


REAL_FILES = [
    f"{_ROOT_DIR}/__samples/files/pip/app1/requirements.txt"
]
@pytest.mark.parametrize('path', REAL_FILES)
def test_read_content_with_real_file(path):
    r = read()
    content = r.content(path)
    assert (len(content) > 0) == True


NOT_FILES = [
    f"{_ROOT_DIR}/__samples/files/pip/app1/",
    f"{_ROOT_DIR}/__samples/files/pip/app1/blah.txt"
]
@pytest.mark.parametrize('path', NOT_FILES)
def test_read_content_with_real_file(path):
    r = read()
    content = r.content(path)
    assert content == None
