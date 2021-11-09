from typing import List
from . import base
from files import read
import json
from pprint import pp


class composer(base):
    """
    Parse php composer files
    """


    manifests: dict = {'include': ["**/composer.json"], 'exclude': []}
    locks: dict = {'include': ['**/composer.lock'], 'exclude': []}
    tags: dict = {'manifests': ['php','composer', 'manifest'], 'locks': ['php', 'composer', 'lock']}


    def parse_manifest(self, file_path: str, packages: list) -> list:
        """
        Parse the composer.json file
        """
        content = read().content(file_path)
        config = json.loads(content)

        # composer.json has two top levels we want to look at, both with same structure
        for key in ['require', 'require-dev']:
            for pkg, ver in config.get(key, {}).items():
                packages = self.merge_into_list(packages, 'name', self.package_info(
                                pkg, ver, file_path, None, self.tags['manifests']
                            ))

        return packages

    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Parse the composer.lock

        """
        content = read().content(file_path)
        config = json.loads(content)

        # composer has packages & packages-dev sections, but both have the same structure
        for key in ['packages', 'packages-dev']:
            items = list(config.get(key, {}))
            # each package in that list is a dict in itself
            for pkg in items:
                # add this packages data into the the list
                packages = self.merge_into_list(
                                packages,
                                'name',
                                self.package_info(
                                    pkg['name'],
                                    pkg['version'],
                                    file_path,
                                    pkg.get('license',[None]).pop(),
                                    self.tags['locks'])
                            )
                # eahc package might have sub requirements of require & require-dev
                for sub in ['require', 'require-dev']:
                    part = pkg.get(sub, {})

                    for name, ver in part.items():
                        packages = self.merge_into_list(
                                            packages,
                                            'name',
                                            self.package_info(
                                                name,
                                                ver,
                                                file_path,
                                                None,
                                                self.tags['locks']
                                            ))

        return packages





    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['composer', '*'])
