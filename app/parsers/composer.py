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
        return super().parse_manifest(file_path, packages)

    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Parse the composer.lock

        """

        return packages





    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['yarn', '*'])
