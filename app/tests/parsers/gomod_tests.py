import pytest
from pprint import pp
from parsers import gomod
import os
from pathlib import Path
_ROOT_DIR = Path( os.path.dirname(__file__ ) + "/../../../" ).resolve()

def test_pip_handles():
    assert gomod.handles('go') == True
    assert gomod.handles('gomod') == True
    assert gomod.handles('pip') == False

def test_gomod_files_find_requirements_simple():
    dir = f"{_ROOT_DIR}/__samples/parsers/go/valid/simple"
    g = gomod()
    found = g.files(dir, g.manifests, g.locks)
    assert len(found['manifests']) == 1
    assert len(found['locks']) == 1


def test_gomod_parse_manifest_simple():
    spath = f"{_ROOT_DIR}/__samples/parsers/go/valid/simple/go.mod"
    p = gomod()
    smanifest = p.parse_manifest(spath, [])
    assert len(smanifest) == 3

    goversion = list ( filter(lambda p: p['name'] == 'go', smanifest) )
    assert len(goversion) == 1
    version = goversion[0]['version']
    assert version == '1.16'



def test_gomod_parse_manifest_third_party():
    spath = f"{_ROOT_DIR}/__samples/parsers/go/valid/tidy/go.mod"
    p = gomod()
    manifest = p.parse_manifest(spath, [])
    xsys = list( filter(lambda l: l['name'] == 'golang.org/x/sys', manifest) )[0]
    assert ('third-party' in xsys['tags']) == True



def test_gomod_parse_lock_simple():
    path = f"{_ROOT_DIR}/__samples/parsers/go/valid/simple/go.sum"
    p = gomod()
    lock = p.parse_lock(path, [])
    assert (len(lock) > 50) == True
