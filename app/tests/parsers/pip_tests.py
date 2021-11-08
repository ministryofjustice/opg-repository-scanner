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
    p = pip()
    smanifest = p.parse_manifest(spath, [])
    assert len(smanifest) == 3


def test_pip_parse_manifest_simple_versioned():
    path = "../__samples/parsers/pip/valid/app1/versioned_requirements.txt"
    pv = pip()
    manifest = pv.parse_manifest(path, [])
    assert len(manifest) == 1
    assert len(manifest[0]['versions']) == 2
    assert len(manifest[0]['tags']) == 3



def test_pip_packages_simple():
    p = pip()
    files = [
        "../__samples/parsers/pip/valid/app1/simple_requirements.txt",
        "../__samples/parsers/pip/valid/app1/versioned_requirements.txt",
        "../__samples/parsers/pip/valid/app2/requirements.txt",
    ]
    # these files contain 4 distinct packages, which then have various versions
    found = p.packages(files, [], True)
    assert len(found) == 4
    # get pprintpp package
    item = {}
    for i in found:
        if i['name'] == 'pprintpp':
            item = i

    assert len(item['files']) == 2
    assert len(item['tags']) == 3


def test_pip_parse_simple():
    p = pip()
    found = p.parse('test-repo',
            '../__samples/parsers/pip/valid/app1',
            p.manifests,
            p.locks,
            []
            )

    assert len(found) == 4
