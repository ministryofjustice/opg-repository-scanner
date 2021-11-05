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


PIP_MANIFESTS = [
    "../__samples/parsers/pip/valid/app1/simple_requirements.txt"
]
@pytest.mark.parametrize('path', PIP_MANIFESTS)
def test_pip_parse_manifest(path):
    b = pip()
    manifest = b.parse_manifest(path)
    assert (len(manifest) == 3) == True
    assert False
