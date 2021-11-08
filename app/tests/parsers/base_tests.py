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

    assert ( len(found['manifests']) == length) == True
    assert ( len(found['locks']) == 0) == True


PARSE_TESTS = [
    "",
    "../__samples/parsers/pip/valid/app1/simple_requirements.txt"
]
@pytest.mark.parametrize('path', PARSE_TESTS)
def test_base_parse_methods(path):
    b = base()
    m = b.parse_manifest(path, [])
    l = b.parse_lock(path, [])
    assert (len(m) == 0) == True
    assert (len(l) == 0) == True


def test_base_merge_into_list():
    b = base()
    items = [
        {'name': 't1', 'versions': ['1', '3'], 'licenses': [], 'tags': [], 'files': [], 'repositories': ['source']},
        {'name': 't2', 'versions': ['1', '3'], 'licenses': [], 'tags': [], 'files': [], 'repositories': ['test']}
    ]
    item = {'name': 't1', 'versions': ['2', '3'], 'licenses': [], 'tags': ['test'], 'files': ['text'], 'repositories':[]}
    merged = b.merge_into_list(items, 'name', item)

    test = merged[0]
    assert (len(test['versions']) == 3) == True
    assert (len(test['licenses']) == 0) == True
    assert (len(test['tags']) == 1) == True
    assert (len(test['files']) == 1) == True