import pytest
from pprint import pp
from parsers import composer

def test_composer_handles():
    assert composer.handles('npm') == False
    assert composer.handles('composer') == True


def test_composer_parse_manifest_simple():
    p = composer()
    file = "../__samples/parsers/composer/valid/laminas/composer.json"
    manifest = p.parse_manifest(file, [])

    pp(manifest)

    assert False
