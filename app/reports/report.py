from files import *
from parsers import *
from pathlib import Path, PosixPath
from datetime import datetime

class report:
    """
    Class used to generate a a report of all software packages being used that
    can be found
    """

    def generate(self, repository:str, directory:str, exclude:list = [], tools:list = ['*']) -> dict:
        """
        Generate the report dict to then save elsewhere
        """
        packages = self.packages(repository, directory, exclude, tools)
        return {
            'packages': packages
        }


    def save(self, artifact_directory:str, report:dict) -> PosixPath:
        """
        Use the artifact_directory as the root and then append
        a known directory structure underneath to save the
        report output into

        Return PosixPath of the directory created

        """
        ts = datetime.today().strftime('%Y-%m-%d-%H%M%S')
        dir = Path(f"{artifact_directory}/__artifacts__/{ts}/")
        w = write()

        # unedited list
        raw = f"{dir}/raw.json"
        w.as_json(raw, report)

        # just package names, no duplicates
        simple = f"{dir}/simple.json"
        simplified = self.simplified_packages(report.get('packages', []))
        w.as_json(simple, simplified)

        return dir.resolve()




    def packages(self, repository:str, directory:str, excludes:list = [], tools:list = ['*']) -> list:
        """
        Find all packages used within directory that matches the tools requested
        and return that as a list.

        Returned list is a flat structure, so contains an entry for every package it finds
        """
        packages = []
        handlers = base.handlers(tools)
        for h in handlers:
            handler = h()
            packages = handler.parse(repository, directory, handler.manifests, handler.locks, packages, excludes=excludes)
        return packages



    def simplified_packages(self, packages: list):
        """
        Take just the list of names and remove duplicates
        """
        packages = [item.get('name', None) for item in packages]
        return list( set ( packages ) )

    def package_from_list(self, name:str, main_list:list, default_value:dict) -> tuple:
        """
        Find the first package identified by `name` or return a copy of `default_value` instead
        """
        packages = list ( filter ( lambda s: s.get('name', None) == name, main_list) )
        if len(packages) > 0:
            return packages.pop(), True
        return default_value.copy(), False

    def expand_package(self, existing:dict, matched:dict, single_to_list:dict):
        """
        Take an existing package set and expand its data with the information
        from the matched dict

        Use the single_to_list to handle the single item values moving to
        a list of them on the existing item
        """
        # merge the two lists of tags
        existing['tags'].extend( matched.get('tags', []) )
        # remove dups
        existing['tags'] = list ( set (existing.get('tags', [] ) ) )
        # loop over all the single items to lists
        for dest,orig in single_to_list.items():
            existing.setdefault(dest, [])
            existing[dest].append(matched.get(orig))
            # remove duplicates
            existing[dest] = list(set(existing.get(dest, []) ) )
        return existing


    def grouped(self, flat_packages:list) -> list:
        """
        Takes the flat_package list and creates a structured version where the
        package name is the key and duplicated versions are merged into the set
        """
        structured = []
        # single values that get convert to lists
        single_to_list = {'versions': 'version', 'sources': 'source', 'types': 'type', 'licenses': 'license', 'repositories': 'repository'}
        for p in flat_packages:
            name = p.get('name', None)
            if name is None:
                raise ValueError(f"Could not find `name` property while converting to grouped structure.")
            # base structure of the package
            struc = {'name': None, 'versions': [],'sources': [], 'licenses': [], 'types': [], 'tags': [], 'repositories': [] }
            # find existing package or get default setup
            package, found = self.package_from_list(name, structured, struc)
            package['name'] = name
            # find all packages with the same name from the original list
            matching = list(filter(lambda pkg: pkg.get('name', None) == name, flat_packages))
            for m in matching:
                package = self.expand_package(package, m, single_to_list)
            # append to the main list
            if found == False:
                structured.append(package)
        return structured
