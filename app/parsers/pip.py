from typing import List
from . import base
from files import read
import requirements
from pprint import pp

class pip(base):
    """
    Handle python pip manifest requirement.txt files and generate
    package lists
    """

    manifests: dict = {'include': ['**/*requirements.txt'], 'exclude': []}
    tags: dict = {'manifests': ['pip', 'python', 'manifest'], 'locks': []}



    def parse_manifest(self, file_path:str, packages:list) -> list:
        """
        Read manifest file and convert into a list of dicts.
        Merge that list of dicts pack in to the packages variable passed along.

        """
        with open(file_path, 'r') as f:
            for req in requirements.parse(f):
                versions = []
                for v in req.specs:
                    versions.append(''.join(v))
                if len(versions) == 0:
                    versions.append(None)
                for version in versions:
                    pkg = self.package_info(req.name, version, file_path, None, self.tags['manifests'], 'manifest' )
                    packages.append(pkg)
        return packages



    @staticmethod
    def handles(tool:str) -> bool:
        """
        Return true if the tool passed is 'pip' or 'python' or '*' (any)
        """
        return (tool in ['pip', 'python', '*'])
