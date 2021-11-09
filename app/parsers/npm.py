from typing import List
from . import base
from files import read
import json

class npm(base):
    """
    Parse package.json and package-lock.json files for npm
    """


    manifests: dict = {'include': ['**/package.json'], 'exclude': []}
    locks: dict = {'include': ['**/package-lock.json'], 'exclude': []}
    tags: dict = {'manifests': ['npm', 'manifest'], 'locks': ['npm' 'lock']}


    def parse_manifest(self, file_path:str, packages:list) -> list:
        """
        Parse the dependencies and devDependencies section of the
        package.json file and convert

        """
        content = read().content(file_path)
        config = json.loads(content)
        # check data from file
        self.file_content_type_match(dict, type(config), file_path, "Manifest")

        for pkg, ver in config.get('dependencies', {}).items():
            packages = self.merge_into_list(packages, 'name', self.package_info(
                            pkg, ver, file_path, None, self.tags['manifests']
                        ))
        for pkg, ver in config.get('devDependencies', {}).items():
            packages = self.merge_into_list(packages, 'name', self.package_info(
                            pkg, ver, file_path, None, self.tags['manifests']
                        ))
        return packages


    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Parse the packages section of the package-lock.json file and convert

        """
        content = read().content(file_path)
        config = json.loads(content)
        # check data from file
        self.file_content_type_match(dict, type(config), file_path, "Lock")

        # loop over packages
        for name, info in config.get('packages', {}).items():
            # if it has a name, then should be a version field too, so add the package
            if len(name) > 0:
                packages = self.merge_into_list(packages, 'name',
                            self.package_info(name.replace("node_modules/", ""), info['version'], file_path, None, self.tags['locks']
                        ))
            # look at the sub items of packages
            for sub_name, sub_version in info.get('dependencies', {}).items():
                packages = self.merge_into_list(packages, 'name',
                            self.package_info(sub_name, sub_version, file_path, None, self.tags['locks']
                        ))
        # check dependancies
        for name, info in config.get('dependencies', {}).items():
            packages = self.merge_into_list(packages, 'name',
                            self.package_info(name, info['version'], file_path, None, self.tags['locks']
                        ))
        return packages




    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['npm', '*'])
