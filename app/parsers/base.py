from typing import List
from pprint import pp
from files import finder


class base:
    """
    Base manifest class to find and parse manifest and
    lock files
    This class generally dealers with reflection methods
    to find suitable parsers and what handles what


    Attributes
    ----------
    repository: str
       Repository name used to identify
    directory: str
        Base directory where file patterns start from
    manifest: dict
        List of manifast patterns to include / exclude
    locks: dict
        List of lock patterns to include / exclude
    tags: dict
        List of tags that will get attached to the packages found within the files

    """
    repository: str = ""
    directory: str = "./"
    manifests: dict = {'include': [], 'exclude': []}
    locks: dict = {'include': [], 'exclude': []}
    tags: dict = {'manifests': [], 'locks': []}


    def package_info(self, name:str, version:str, file_path:str, license:str, tags:list) -> dict:
        """
        Return a dict with standardised keys for the data provided.
        This package dict is then used elsewhere

            Parameters
                name (str)      : Package name
                version (str)   : Version string for the this package
                file_path (str) : File package was found within
                license (str)   : License details (such as MIT) if available
                tags (list)     : List of strings used for tagging data

            Return
                package (dict)  : Standard structure dict
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

            Parameters:
                items (list)    : The existing list of packages to merge the new_item into
                key (str)       : Dictonary key to use to check if new_item is already in the items list
                new_items (dict): New set of data we want to merge into the existing items list
                struct (list)   : List of keys that exist in elements in items and new_item that should be merged

            Return:
                items (list)    : An updated version of the items passed in which now contains the new_item data
        """
        found = False
        # look for existing version based on the key
        for i, item in enumerate(items):
            if item[key] == new_item[key]:
                found = True
                for col in struct:
                    items[i][col].extend(new_item[col])

        # new item, so add to the list
        if not found:
            items.append(new_item)

        # remove duplicates within each list items data
        for col in struct:
            for i, item in enumerate(items):
                items[i][col] = list(set(items[i][col]))

        return items



    def files(self, directory:str, manifests:dict, locks:dict) -> dict:
        """
        Call the finder class to find the manifest and lock files
        used by this class


            Parameters:
                directory (str) : Directory to look for files within
                manifests (dict): Include & exclude patterns to find files
                locks (dict)    : Include & exclude patterns to find files

            Return:
                dict with manifests and locks keys containg list of files for each

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

            Parameters:
                file_path (str): Location of the file
                packages (list): Existing set of packages

            Return:
                packages (list): Updated version
        """
        return packages

    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Read lock file and convert into a dict.
        Should be replaced per subclass

            Parameters:
                file_path (str): Location of the file
                packages (list): Existing set of packages

            Return:
                packages (list): Updated version

        """
        return packages


    def packages(self, files:list, manifest:bool) -> list:
        """
        Loop over the file list passed in and then run that file into
        either parse_manifest or parse_lock depending on the value
        of the manifest boolean passed

        This will then return a de-duplicated list of all packages
        from the list of files with version data etc merged together

        Packages are then sorted by name

            Parameters:
                files (list)    : List of files to process for packages
                manifest (bool) : Flag to determine if these files are manifests (True) or locks (False)

            Returns:
                packages (list) : List of packages, sorted and de-duplicated.
        """
        packages = []
        for f in files:
            packages = self.parse_manifest(f, packages) if manifest else self.parse_lock(f, packages)

        # sort packages by name
        return sorted(packages, key = lambda d : d['name'])


    def parse(self,
            repository:str,
            directory:str,
            manifests:dict,
            locks:dict) -> dict:
        """
        Main method. Parse uses the details passed to return a dict
        of manifest and lock packages found for this class

            Paramaters:
                repository (str): Name of the repository being scanned
                directory (str) : File path that will be used
                manifests (dict): Include and exclude patterns to use to find manifest files (see pip.manifests as example)
                locks (dict)    : Include and exclude patterns to use to find locks files (same structure as manifests)

            Returns:
                result (dict)   : Dict of 'manifests' and 'locks' with each being a list of packages generated from package_info


        """
        self.repository = repository

        files = self.files(directory, manifests=manifests, locks=locks)
        manifests = self.packages(files['manifests'], True)
        locks = self.packages(files['locks'], False)

        result = {'manifests': manifests, 'locks': locks}
        return result



    @classmethod
    def handlers(cls, tools:List[str]) -> list:
        """
        Static method to find a list of classes which
        can handle the list of tools passed

            Parameters:
                tools (list)    : List of tool names to match with classes

            Returns
                handlers (list) : List of classes that handle the tools requested

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
