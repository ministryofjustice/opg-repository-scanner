from typing import List
from . import base

class npm(base):
    """
    """
    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['npm', '*'])
