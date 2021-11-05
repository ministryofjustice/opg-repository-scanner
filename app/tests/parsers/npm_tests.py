import pytest
from pprint import pp
from parsers import npm

def test_npm_handles():
    assert npm.handles('npm') == True
    assert npm.handles('yarn') == False
