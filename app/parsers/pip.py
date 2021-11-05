from typing import List
from . import base
from files import read

from pprint import pp

class pip(base):
    """
    """

    manifests: dict = {'include': ['**/*requirements.txt'], 'exclude': []}
    tags: dict = {'manifests': ['pip', 'python', 'manifest'], 'locks': []}



    def parse_manifest(self, file_path:str) -> list:
        """
        Read manifest file and convert into a list of dicts.
        """
        packages = []
        reader = read()
        lines = self.file_lines(reader, file_path)
        for line in lines:
            split = line.split("=")
            if len(split) > 0:
                pkg = self.package_info(
                        split[0],
                        split[1] if len(split) > 1 else None,
                        file_path,
                        None,
                        self.tags['manifests']
                )

                packages = self.merge_into_list(packages, 'name', pkg)

        return packages



    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['pip', 'python'])
