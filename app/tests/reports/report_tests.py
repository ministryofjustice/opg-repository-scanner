import pytest
from pprint import pp
from reports import report


def test_reports_packages_simple():
    r = report()
    f = r.packages('test-repo', '../__samples/parsers/pip/valid/app1', ['*'])
    assert (len(f) > 3) == True
