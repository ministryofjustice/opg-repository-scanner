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


    def file_content_type_match(self, expected, actual, file_path:str, prefix:str):
        if actual != expected:
            raise ValueError(f"[{self.__class__}] {prefix} file [{file_path}] data is invalid. Should be a {expected}, found {actual}.")


    def package_info(self, name:str, version:str, file_path:str, license:str, tags:list, type_of:str) -> dict:
        """
        Return a dict with standardised keys for the data provided.
        This package dict is then used elsewhere

            Parameters
                name (str)      : Package name
                version (str)   : Version string for the this package
                file_path (str) : File package was found within
                license (str)   : License details (such as MIT) if available
                tags (list)     : List of strings used for tagging data
                type_of (str)   : String, generally 'manifest' or 'lock'

            Return
                package (dict)  : Standard structure dict
        """
        r = self.repository
        return {
                'name': name if name != None and len(name) > 0 else None,
                'repository': r if r != None and len(r) > 0 else None,
                'version': version if version != None and len(version) > 0 else None,
                'source': file_path if file_path != None and len(file_path) > 0 else None,
                'license': license if license != None and len(license) > 0 else None,
                'type': type_of if type_of !=  None and len(type_of) > 0 else None,
                'tags': tags
            }

    def files(self, directory:str, manifests:dict, locks:dict, excludes:list = []) -> dict:
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

        manifest_excludes = manifests.get('exclude', [])
        manifest_excludes.extend(excludes)

        lock_excludes = locks.get('exclude', [])
        lock_excludes.extend(excludes)

        return {
            'manifests': f.get( directory, manifests.get('include', []), manifest_excludes ),
            'locks': f.get(directory, locks.get('include', []), lock_excludes)
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


    def packages(self, files:list, packages: list, manifest:bool) -> list:
        """
        Loop over the file list passed in and then run that file into
        either parse_manifest or parse_lock depending on the value
        of the manifest boolean passed

        This will then return a de-duplicated list of all packages
        from the list of files with version data etc merged together

        Packages are then sorted by name

            Parameters:
                files (list)    : List of files to process for packages
                packages (list) : Existing list of packages that will be expanded
                manifest (bool) : Flag to determine if these files are manifests (True) or locks (False)

            Returns:
                packages (list) : List of packages, sorted and de-duplicated.
        """
        for f in files:
            packages = self.parse_manifest(f, packages) if manifest else self.parse_lock(f, packages)

        # sort packages by name
        return sorted(packages, key = lambda d : d['name'])


    def parse(self,
            repository:str,
            directory:str,
            manifests:dict,
            locks:dict,
            packages:list,
            excludes:list = []
            ) -> dict:
        """
        Main method. Parse uses the details passed to return a dict
        of manifest and lock packages found for this class

            Paramaters:
                repository (str): Name of the repository being scanned
                directory (str) : File path that will be used
                manifests (dict): Include and exclude patterns to use to find manifest files (see pip.manifests as example)
                locks (dict)    : Include and exclude patterns to use to find locks files (same structure as manifests)
                packages (list) : Existing list of packages that will be expanded

            Returns:
                packages (list) : List of packages, sorted and de-duplicated.


        """
        self.repository = repository

        files = self.files(directory, manifests=manifests, locks=locks, excludes=excludes)
        packages = self.packages(files['manifests'], packages, True)
        packages = self.packages(files['locks'], packages, False)

        return packages



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
