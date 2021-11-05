import pytest
from pprint import pp
from parsers import base



def test_base_subclasses():
    kids = base.children()
    assert ( len( kids ) > 0 ) == True

def test_base_handles_is_false():
    assert base.handles('Any') == False

def test_base_find_npm_only():
    found = base.handlers(['npm'])
    assert len(found) == 1

def test_base_files_with_defaults():
    b = base()
    dir = "../__samples/parsers/pip/valid/app1/"
    found = b.files(dir, b.manifests, b.locks)

    assert ( len(found['manifests']) == 0) == True
    assert ( len(found['locks']) == 0) == True



MANIFEST_PATTERNS = [
    ("*.txt", 3),
    ("*requirements.txt", 2)
]

@pytest.mark.parametrize('pattern,length', MANIFEST_PATTERNS)
def test_base_files_with_test_files(pattern, length):
    b = base()
    dir = "../__samples/parsers/pip/valid/app1/"
    found = b.files(
            dir,
            {'include': [pattern],'exclude': [] },
            b.locks)
    pp(found)
    assert ( len(found['manifests']) == length) == True
    assert ( len(found['locks']) == 0) == True
