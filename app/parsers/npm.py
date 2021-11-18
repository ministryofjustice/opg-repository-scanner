from typing import List
from . import base
from files import read
import json
from pprint import pp


class npm(base):
    """
    Parse package.json and package-lock.json files for npm
    """


    manifests: dict = {'include': ['**/package.json'], 'exclude': []}
    locks: dict = {'include': ['**/package-lock.json'], 'exclude': []}
    tags: dict = {'manifests': ['npm', 'manifest'], 'locks': ['npm', 'lock']}


    def parse_manifest(self, file_path:str, packages:list, file_name:str = None) -> list:
        """
        Parse the dependencies and devDependencies section of the
        package.json file and convert

        """
        content = read().content(file_path)
        config = json.loads(content)
        # check data from file
        self.file_content_type_match(dict, type(config), file_path, "Manifest")

        for toplevel in ['dependencies', 'devDependencies']:
            for pkg, ver in config.get(toplevel, {}).items():
                packages.append(
                    self.package_info(pkg, ver, file_name if file_name != None else file_path, None, self.tags['manifests'], 'manifest')
                )
        return packages


    def clean_package_name(self, package_name:str) -> str:
        """
        As npm package names get path like structures for sub requirements
        (ie node_modules/@babel/core/node_modules/semver) we split on the
        node_modules and return the last entry, which should be the real
        package name (ie semver)

        """
        return package_name.split("node_modules/").pop() if package_name != None else None



    def parse_lock(self, file_path:str, packages:list, file_name:str = None) -> list:
        """
        Parse the packages section of the package-lock.json file and convert

        """
        content = read().content(file_path)
        config = json.loads(content)
        # check data from file
        self.file_content_type_match(dict, type(config), file_path, "Lock")


        # firstly, go over the contents and make a flatter version as theres lots of nesting
        lock_packages = []
        # top level config items
        for key in ['packages', 'dependencies']:
            for name, info in config.get(key, {}).items():
                # push info
                pkg = self.package_info(
                    name,
                    info.get('version', None),
                    file_name if file_name != None else file_path,
                    None,
                    self.tags['locks'],
                    'lock')
                lock_packages.append(pkg)
                # loop over sub iteme
                for sub_key in ['dependencies', 'requires', 'peerDependencies']:
                    for sub_name, sub_ver in info.get(sub_key, {}).items():
                        # for some sub items they are actually a dict, not a key value pair,
                        # so get the version key
                        if type(sub_ver) == dict:
                            sub_ver = sub_ver.get('version', None)

                        sub_pkg = self.package_info(
                            sub_name,
                            sub_ver,
                            file_name if file_name != None else file_path,
                            None,
                            self.tags['locks'],
                            'lock')
                        lock_packages.append(sub_pkg)

        # now, clean up the names of each of the packages found in the tree
        # and push on to the package list
        for l in lock_packages:
            l['name'] = self.clean_package_name(l.get('name', None))
            if l['name'] != None:
                packages.append(l)

        return packages




    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['npm', '*'])
