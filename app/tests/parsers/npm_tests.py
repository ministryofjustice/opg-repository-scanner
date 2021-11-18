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
    assert len(lock) == 10


def test_npm_parse_lock_nesting():
    p = npm()
    file = "../__samples/parsers/npm/valid/nesting/package-lock.json"
    lock = p.parse_lock(file, [])

    semver = list( filter (lambda i: i['name'] == 'semver', lock) )
    assert len(semver) == 5

def test_npm_parse_lock_versions_are_flat():
    """
    Targeted at npm lock files to ensure the dependancies under a package
    pulls the version
    """
    p = npm()
    file = "../__samples/parsers/npm/valid/project/package-lock.json"
    lock = p.parse_lock(file, [])

    string_width = list ( filter (lambda i: i['name'] == "string-width", lock ) )
    version_as_dict = False
    # look over all string with packages and make sure they are all flat versions
    for p in string_width:
        if type(p.get('version', None)) == dict:
            version_as_dict = True

    assert version_as_dict == False
