import pytest
from pprint import pp
from parsers import npm

def test_npm_handles():
    assert npm.handles('npm') == True
    assert npm.handles('yarn') == False


def test_npm_parse_manifests_empty():
    p = npm()
    file = "../__samples/parsers/npm/valid/empty/package.json"
    manifest = p.parse_manifest(file, [])
    assert manifest == []
    assert len(manifest) == 0


def test_npm_parse_manifests_nuxt():
    p = npm()
    file = "../__samples/parsers/npm/valid/nuxt/package.json"
    manifest = p.parse_manifest(file, [])
    assert len(manifest) == 2


def test_npm_parse_lock_simple():
    p = npm()
    file = "../__samples/parsers/npm/valid/simple/package-lock.json"
    lock = p.parse_lock(file, [])

    assert len(lock) == 3
