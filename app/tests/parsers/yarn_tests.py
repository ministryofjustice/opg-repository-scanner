import pytest
from pprint import pp
from parsers import yarn

def test_npm_handles():
    assert yarn.handles('npm') == False
    assert yarn.handles('yarn') == True


def test_yarn_parse_manifests_empty():
    p = yarn()
    file = "../__samples/parsers/yarn/valid/"
    manifest = p.packages("../__samples", file, [], True)
    assert manifest == []
    assert len(manifest) == 0


def test_yarn_parse_lock_simple():
    p = yarn()
    file = "../__samples/parsers/yarn/valid/sample/yarn.lock"
    lock = p.parse_lock(file, [])
    assert len(lock) == 12

    fil = list( filter(lambda l: l['name'] == '@types/pk1', lock))
    assert len(fil) == 3

    ver = list( filter(lambda l: l['version'] == '3.0.3', fil))
    assert len(ver) == 1

    # check the double quotes have been removed correctly
    # and the @ has been kept at the start of name
    foundQuote = False
    foundAt = False
    for l in lock:
        if '"' in l['name']:
            foundQuote = True
        if '@' in l['name'] and l['name'][0] == '@':
            foundAt = True

    assert foundQuote == False
    assert foundAt == True
