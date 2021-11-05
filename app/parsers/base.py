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
    repository: str = ""

    directory: str = "./"
    manifests: dict = {'include': [], 'exclude': []}
    locks: dict = {'include': [], 'exclude': []}

    files: dict = {'manifests': [], 'locks': []}

    tags: dict = {'manifests': [], 'locks': []}

    def file_lines(self, reader, file_path:str) -> list:
        """
        Use the reader to split file content into lines
        """
        content = reader.content(file_path)
        if content != None:
            return content.strip().split('\n')
        return []

    def package_info(self, name:str, version:str, file_path:str, license:str, tags:list) -> dict:
        """
        Return a dict with standardised keys for the data provided.
        This package dict is then used elsewhere
        """
        return {
                'name': name,
                'repositories': [self.repository],
                'versions': [version],
                'files': [file_path],
                'licenses': [license],
                'tags': tags
            }

    def merge_into_list(self,
        items:list,
        key:str,
        new_item:dict,
        struct:list = ['versions', 'repositories', 'tags', 'files']) -> list:
        """
        Take a new_item dict (with struct sub lists), look if the key already exists within
        the items list, if it does, merge the data together (removing duplicates), otherwise
        append the new version
        """
        found = False
        for i, item in enumerate(items):
            if item[key] == new_item[key]:
                for col in struct:
                    items[i][col].extend(new_item[col])
                    items[i][col] = list(set(items[i][col]))
                found = True
        if not found:
            items.append(new_item)
        return items



    def files(self, directory:str, manifests:dict, locks:dict) -> dict:
        """
        Call the finder class to find the manifest and lock files
        used by this class
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

    def parse_manifest(self, file_path:str, packages:list) -> list:
        """
        Read manifest file and convert into a dict.
        Should be replaced per subclass
        """
        return []

    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Read lock file and convert into a dict.
        Should be replaced per subclass
        """
        return []


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
