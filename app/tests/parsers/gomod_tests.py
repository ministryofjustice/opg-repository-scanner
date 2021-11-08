import pytest
from pprint import pp
from parsers import gomod

def test_pip_handles():
    assert gomod.handles('go') == True
    assert gomod.handles('gomod') == True
    assert gomod.handles('pip') == False

def test_gomod_files_find_requirements_simple():
    dir = "../__samples/parsers/go/valid/simple"
    g = gomod()
    found = g.files(dir, g.manifests, g.locks)
    assert len(found['manifests']) == 1
    assert len(found['locks']) == 1


def test_gomod_parse_manifest_simple():
    spath = "../__samples/parsers/go/valid/simple/go.mod"
    p = gomod()
    smanifest = p.parse_manifest(spath, [])
    assert len(smanifest) == 2


def test_gomod_parse_lock_simple():
    path = "../__samples/parsers/go/valid/simple/go.sum"
    p = gomod()
    lock = p.parse_lock(path, [])
    pp(len(lock))
    assert (len(lock) > 50) == True



# def test_pip_parse_manifest_simple_versioned():
#     path = "../__samples/parsers/pip/valid/app1/versioned_requirements.txt"
#     pv = pip()
#     manifest = pv.parse_manifest(path, [])
#     assert len(manifest) == 1
#     assert len(manifest[0]['versions']) == 2
#     assert len(manifest[0]['tags']) == 3



# def test_pip_packages_simple():
#     p = pip()
#     files = [
#         "../__samples/parsers/pip/valid/app1/simple_requirements.txt",
#         "../__samples/parsers/pip/valid/app1/versioned_requirements.txt",
#         "../__samples/parsers/pip/valid/app2/requirements.txt",
#     ]
#     # these files contain 4 distinct packages, which then have various versions
#     found = p.packages(files, [], True)
#     assert len(found) == 4
#     # get pprintpp package
#     item = {}
#     for i in found:
#         if i['name'] == 'pprintpp':
#             item = i

#     assert len(item['files']) == 2
#     assert len(item['tags']) == 3


# def test_pip_parse_simple():
#     p = pip()
#     found = p.parse('test-repo',
#             '../__samples/parsers/pip/valid/app1',
#             p.manifests,
#             p.locks,
#             []
#             )

#     assert len(found) == 4
