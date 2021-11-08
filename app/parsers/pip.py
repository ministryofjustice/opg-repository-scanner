from typing import List
from . import base
from files import read

from pprint import pp

class pip(base):
    """
    """

    manifests: dict = {'include': ['**/*requirements.txt'], 'exclude': []}
    tags: dict = {'manifests': ['pip', 'python', 'manifest'], 'locks': []}



    def parse_manifest(self, file_path:str, packages:list) -> list:
        """
        Read manifest file and convert into a list of dicts.
        Merge that list of dicts pack in to the packages variable passed along.

        """
        seperator = "=="
        reader = read()
        lines = reader.lines(file_path)
        for line in lines:
            split = line.split(seperator)
            if len(split) > 0:
                pkg = self.package_info(
                        split[0].strip(),
                        split[1] if len(split) > 1 else None,
                        file_path,
                        None,
                        self.tags['manifests']
                )

                packages = self.merge_into_list(packages, 'name', pkg)

        return packages



    @staticmethod
    def handles(tool:str) -> bool:
        """
        Return true if the tool passed is 'pip' or 'python'
        """
        return (tool in ['pip', 'python'])
