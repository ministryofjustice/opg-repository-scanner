from pprint import pp
from typing import List
from . import base
from files import read

class gomod(base):
    """
    Parse go.mod & go.sum files and generate package lists

    """

    manifests: dict = {'include': ['**/go.mod'], 'exclude': []}
    locks: dict = {'include': ['**/go.sum'], 'exclude': []}
    tags: dict = {'manifests': ['go', 'gomod', 'manifest'], 'locks': ['go', 'gomod' 'lock']}


    def version(self, lines:list) -> str:
        """
        Looks within the file content lines for the line that begins with
        'go ' which should also contain the version number of go

        Returns just the version number
        """
        line = list ( filter( lambda l: l.find("go ") == 0, lines) )
        return list ( map (lambda l: l.replace("go ", ''), line) ).pop()



    def parse_manifest(self, file_path:str, packages:list) -> list:
        """
        Read manifest file (go.mod) and convert into a list of dicts.
        Merge that list of dicts pack in to the packages variable passed along.

        """


        is_a_package = ' v'
        is_third_party = '// indirect'
        reader = read()
        lines = reader.lines(file_path)

        # push the go version being used into packages
        go_version = self.version(lines)
        if go_version:
            packages.append(
                self.package_info('go', go_version, file_path, None, self.tags['manifests'], 'manifest')
            )

        # reduce the list of lines to just the packages
        items = list( filter(lambda l: (is_a_package in l), lines) )
        # run replaces over each item to clean up the entries
        mapped = list( map(lambda pkg:
                        pkg
                            .replace('\t', '')
                            .replace(is_third_party, is_third_party.replace(' ', ''))
                            .split(" "),
                        items) )

        for m in mapped:
            tags = self.tags['manifests']
            # if this package is marked as indirect, push a tag
            if is_third_party.replace(' ', '') in m:
                tags.append('third-party')

            pkg = self.package_info(
                    m[0].strip(),
                    m[1] if len(m) > 1 else None,
                    file_path,
                    None,
                    tags,
                    'manifest'
                )
            packages.append(pkg)

        return packages



    def parse_lock(self, file_path:str, packages:list) -> list:
        """
        Read lock file (go.sum) and convert into a list of dicts.
        Merge that list of dicts pack in to the packages variable passed along.
        """
        is_a_package = ' v'
        reader = read()
        lines = reader.lines(file_path)
        # reduce the list of lines to just the packages
        items = list( filter(lambda l: (is_a_package in l), lines) )
        # run replaces over each item to clean up the entries
        mapped = list( map(lambda pkg: pkg.split(" "), items) )

        for m in mapped:
            pkg = self.package_info(
                    m[0].strip(),
                    m[1].replace("/go.mod", "") if len(m) > 1 else None,
                    file_path,
                    None,
                    self.tags['locks'],
                    'lock'
                )
            packages.append(pkg)

        return packages


    @staticmethod
    def handles(tool:str) -> bool:
        return (tool in ['go', 'gomod', '*'])
