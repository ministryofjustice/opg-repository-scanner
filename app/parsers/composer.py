from typing import List
from . import base
from files import read
import json



class composer(base):
    """
    Parse php composer files
    """


    manifests: dict = {'include': ["**/composer.json"], 'exclude': []}
    locks: dict = {'include': ['**/composer.lock'], 'exclude': []}
    tags: dict = {'manifests': ['php','composer', 'manifest'], 'locks': ['php', 'composer', 'lock']}


    def parse_manifest(self, file_path: str, packages: list) -> list:
        """
        """
        content = read().content(file_path)
        config = json.loads(content)

        for pkg, ver in config.get('require', {}).items():
            packages = self.merge_into_list(packages, 'name', self.package_info(
                            pkg, ver, file_path, None, self.tags['manifests']
                        ))
        for pkg, ver in config.get('require-dev', {}).items():
            packages = self.merge_into_list(packages, 'name', self.package_info(
                            pkg, ver, file_path, None, self.tags['manifests']
                        ))

        return packages

    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Parse the composer.lock

        """

        return packages





    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['composer', '*'])
