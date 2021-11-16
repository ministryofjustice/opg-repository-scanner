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


    def parse_manifest(self, file_path: str, packages: list, file_name:str = None) -> list:
        """
        Parse the composer.json file
        """
        content = read().content(file_path)
        config = json.loads(content)
        # check data from file
        self.file_content_type_match(dict, type(config), file_path, "Manifest")

        # composer.json has two top levels we want to look at, both with same structure
        for key in ['require', 'require-dev']:
            for pkg, ver in config.get(key, {}).items():
                packages.append(
                    self.package_info(
                        pkg,
                        ver,
                        file_name if file_name != None else file_path,
                        None,
                        self.tags['manifests'],
                        'manifest')
                )

        return packages

    def parse_lock(self, file_path:str, packages:list, file_name:str = None) -> list:
        """
        Parse the composer.lock

        """
        content = read().content(file_path)
        config = json.loads(content)
        # check data from file
        self.file_content_type_match(dict, type(config), file_path, "Lock")

        # composer has packages & packages-dev sections, but both have the same structure
        for key in ['packages', 'packages-dev']:
            items = list(config.get(key, {}))
            # each package in that list is a dict in itself
            for pkg in items:
                # add this packages data into the the list
                packages.append(
                    self.package_info(
                        pkg['name'],
                        pkg['version'],
                        file_name if file_name != None else file_path,
                        pkg.get('license', None).pop(),
                        self.tags['locks'],
                        'lock')
                )
                # eahc package might have sub requirements of require & require-dev
                for sub in ['require', 'require-dev']:
                    part = pkg.get(sub, {})
                    for name, ver in part.items():
                        packages.append(
                            self.package_info(
                                name,
                                ver,
                                file_name if file_name != None else file_path,
                                None,
                                self.tags['locks'],
                                'lock')
                        )

        return packages





    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['composer', '*'])
