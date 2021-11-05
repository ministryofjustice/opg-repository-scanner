from typing import List
from pprint import pp
from files import finder


class base:
    """
    Base manifest class to find and parse manifest and
    lock files
    This class generally dealers with reflection methods
    to find suitable parsers and what handles what
    """

    directory: str = "./"
    manifests: dict = {'include': [], 'exclude': []}
    locks: dict = {'include': [], 'exclude': []}

    files: dict = {'manifests': [], 'locks': []}


    def files(self, directory:str, manifests:dict, locks:dict) -> dict:
        """
        Find all files
        """
        f = finder()
        return {
            'manifests': f.get(directory,
                            (manifests['include'] or [] ),
                            (manifests['exclude'] or [] )),
            'locks': f.get(directory,
                            (locks['include'] or [] ),
                            (locks['exclude'] or []) )
        }



    @classmethod
    def handlers(cls, tools:List[str]) -> list:
        """
        Static method to find a list of classes which
        can handle the list of tools passed
        """
        possibles = cls.children()
        handlers = []
        for p in possibles:
            for tool in tools:
                if p.handles(tool):
                    handlers.append(p)
        return handlers


    @classmethod
    def children(cls) -> list:
        """
        Return all subclasses of this class
        """
        return cls.__subclasses__()

    @staticmethod
    def handles(tool:str) -> bool:
        """
        Determines what tool names class handles.
        Should be overwritten by sub class.
        """
        return False
