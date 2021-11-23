import pytest
from pprint import pp
from parsers import pip
import os
from pathlib import Path
_ROOT_DIR = Path( os.path.dirname(__file__ ) + "/../../../" ).resolve()




def test_pip_handles():
    assert pip.handles('pip') == True
    assert pip.handles('python') == True
    assert pip.handles('yarn') == False

def test_pip_files_find_requirements_simple():
    dir = f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1"
    p = pip()
    found = p.files(dir, p.manifests, p.locks)
    assert len(found['manifests']) == 2
    assert len(found['locks']) == 0

def test_pip_parse_manifest_simple():
    spath = f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1/simple_requirements.txt"
    p = pip()
    smanifest = p.parse_manifest(spath, [])
    assert len(smanifest) == 4


def test_pip_parse_manifest_simple_versioned():
    path = f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1/versioned_requirements.txt"
    pv = pip()
    manifest = pv.parse_manifest(path, [])
    assert len(manifest) == 2



def test_pip_packages_simple():
    p = pip()
    files = [
        f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1/simple_requirements.txt",
        f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1/versioned_requirements.txt",
        f"{_ROOT_DIR}/__samples/parsers/pip/valid/app2/requirements.txt",
    ]
    # these files contain 4 distinct packages, which then have various versions
    found = p.packages(f"{_ROOT_DIR}/__samples", files, [], True)
    assert len(found) == 7
    # get pprintpp package
    pp_package = list( filter(lambda p: p['name'] == 'pprintpp', found) )
    assert len(pp_package) == 3


def test_pip_parse_simple():
    p = pip()
    found = p.parse('test-repo',
            f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1",
            p.manifests,
            p.locks,
            []
            )

    assert len(found) == 6
