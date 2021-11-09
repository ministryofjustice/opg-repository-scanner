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

    assert len(manifest) == 17


def test_composer_parse_lock_simple():
    p = composer()
    file = "../__samples/parsers/composer/valid/laminas/composer.lock"
    locks = p.parse_lock(file, [])
    assert (len(locks) > 100) == True


def test_composer_parse_lock_package():
    p = composer()
    file = "../__samples/parsers/composer/valid/laminas/composer.lock"
    locks = p.parse_lock(file, [])

    laminas = list(filter(lambda l: l['name'] == 'laminas/laminas-stdlib', locks))
    assert len(laminas) == 1
    pkg = laminas.pop()
    # should have 1 license
    assert len(pkg['licenses']) == 1
    # 7 variations on version
    assert len(pkg['versions']) == 7
