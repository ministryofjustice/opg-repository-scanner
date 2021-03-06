import json
import pytest
from pprint import pp
from reports import report
import os
from pathlib import Path
_ROOT_DIR = Path( os.path.dirname(__file__ ) + "/../../../" ).resolve()


def test_reports_packages_simple():
    r = report()
    f = r.packages('test-repo', f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1", [], ['*'])
    assert (len(f) > 3) == True


def test_reports_grouped_packages_simple():
    r = report()
    flat = [
        {'name': 'one', 'repository': None, 'version': '^1', 'source': 'test', 'license': 'MIT','type': 'lock', 'tags': ['test', 'lock']},
        {'name': 'one', 'repository': None, 'version': '1.0.1', 'source': 'test', 'type': 'lock', 'tags': ['test-2']},
        {'name': 'two', 'repository': 'test-repo', 'version': '2.0.5', 'source': 'test.txt', 'type': 'lock', 'tags': ['test', 'manifest']},
    ]

    grouped = r.grouped(flat)
    assert len(grouped) == 2

    g_one = list( filter (lambda i: i['name'] == 'one', grouped))
    assert len(g_one) == 1
    assert len(g_one[0]['versions']) == 2
    assert len(g_one[0]['tags']) == 3



def test_reports_generate_simple():
    r = report()
    f = r.generate('test-repo', f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1", [], ['*'])
    p = f.get('packages', None)
    assert type(p) == list
    assert (len(p) > 3) == True


def test_reports_save_simple():
    r = report()
    f = r.generate('test-repo', f"{_ROOT_DIR}/__samples/parsers/pip/valid/app1", [], ['*'])
    dir = r.save('../', f)
    # test the simple json has the 4 packages in there and no duplicates
    file_path = f"{dir}/simple.json"
    temp = json.load(open(file_path, "r"))
    assert len(temp) == 4
    # pp only in there once
    pkg = list( filter (lambda i: i == "pprintpp", temp))
    assert len(pkg) == 1
