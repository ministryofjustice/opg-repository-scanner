import pytest
from pprint import pp
from parsers import pip

def test_pip_handles():
    assert pip.handles('pip') == True
    assert pip.handles('python') == True
    assert pip.handles('yarn') == False

def test_pip_files_find_requirements_simple():
    dir = "../__samples/parsers/pip/valid/app1"
    p = pip()
    found = p.files(dir, p.manifests, p.locks)
    assert len(found['manifests']) == 2
    assert len(found['locks']) == 0
