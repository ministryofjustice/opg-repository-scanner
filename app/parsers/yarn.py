from typing import List
from . import base
from files import read
import json
import re

from pprint import pp


class yarn(base):
    """
    Parse yarn.lock files
    """


    manifests: dict = {'include': [], 'exclude': []}
    locks: dict = {'include': ['**/package-lock.json'], 'exclude': []}
    tags: dict = {'manifests': ['yarn', 'manifest'], 'locks': ['yarn' 'lock']}


    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Parse the packages section of the yarn.lock file and convert

        """
        content = read().content(file_path)
        # find package & version fields in the lock
        reg = re.compile(r'(.*):\n.*version "(.*)"', re.MULTILINE)
        found = reg.findall(content)
        for group in found:
            group = list(group)
            installed_version = group.pop()
            # in yarn, the package name can look like "@types/pk1@*", "@types/pk1@^3.0.3"
            # multiple packages have differing version needs
            names = group[0].split(', ')

            for n in names:
                # as some packages start with @, yarn wraps those in double quotes
                # so remove those
                name = n.replace('"', '')
                # for easier splitting, swap @ (used for version and as prefix) for encoded
                name = "&#64;" + name[1:] if name.find('@') == 0 else name
                # split by version
                name_version = name.split("@")
                pkg = self.package_info(
                        name_version[0].replace('&#64;', '@'),
                        name_version[1] if len(name_version) > 1 else None,
                        file_path,
                        None,
                        self.tags['locks'] )
                # push the installed version into version list too
                pkg['versions'].append(installed_version)
                packages = self.merge_into_list(packages, 'name', pkg)


        return packages





    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['yarn', '*'])
