from typing import List
from . import base

class pip(base):
    """
    """

    manifests: dict = {'include': ['**/*requirements.txt'], 'exclude': []}

    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['pip', 'python'])
