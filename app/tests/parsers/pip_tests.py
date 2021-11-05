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

def test_pip_parse_manifest_simple():
    spath = "../__samples/parsers/pip/valid/app1/simple_requirements.txt"
    b = pip()
    smanifest = b.parse_manifest(spath, [])
    ml = len(smanifest)
    assert (ml == 3) == True


def test_pip_parse_manifest_simple_versioned():
    path = "../__samples/parsers/pip/valid/app1/versioned_requirements.txt"
    pv = pip()
    manifest = pv.parse_manifest(path, [])
    pp(manifest)
    assert len(manifest) == 1
    assert len(manifest[0]['versions']) == 2
