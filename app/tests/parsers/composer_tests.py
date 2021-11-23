import pytest
from pprint import pp
from parsers import composer
import os
from pathlib import Path
_ROOT_DIR = Path( os.path.dirname(__file__ ) + "/../../../" ).resolve()


def test_composer_handles():
    assert composer.handles('npm') == False
    assert composer.handles('composer') == True


def test_composer_parse_manifest_simple():
    p = composer()
    file = f"{_ROOT_DIR}/__samples/parsers/composer/valid/laminas/composer.json"
    manifest = p.parse_manifest(file, [])
    pp(len(manifest))
    assert len(manifest) == 17


def test_composer_parse_lock_simple():
    p = composer()
    file = f"{_ROOT_DIR}/__samples/parsers/composer/valid/laminas/composer.lock"
    locks = p.parse_lock(file, [])
    assert (len(locks) > 100) == True


def test_composer_parse_lock_package():
    p = composer()
    file = f"{_ROOT_DIR}/__samples/parsers/composer/valid/laminas/composer.lock"
    locks = p.parse_lock(file, [])

    laminas = list(filter(lambda l: l['name'] == 'laminas/laminas-stdlib', locks))
    assert (len(laminas) > 1) == True


def test_composer_parse_manifast_invalid_array():
    p = composer()
    file = f"{_ROOT_DIR}/__samples/parsers/composer/invalid/array/composer.json"
    with pytest.raises(ValueError) as e_info:
        res = p.parse_manifest(file, [])
