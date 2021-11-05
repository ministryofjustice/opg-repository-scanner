import pytest
from pprint import pp
from parsers import base



def test_base_subclasses():
    kids = base.children()
    assert ( len( kids ) > 0 ) == True

def test_base_handles_is_false():
    assert base.handles('Any') == False

def test_base_find_npm_only():
    found = base.handlers(['npm'])
    assert len(found) == 1
