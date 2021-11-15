import glob
from typing import List
import re


class finder:
    """
    Class to provide file related lookups functionality
    """

    def patterns_with_prefix(self, directory:str, patterns:List[str]) -> List[str]:
        """
        Adds the directory to the front of each pattern in the list passed in
        """
        prefix = directory.removesuffix("/") + "/"
        return [prefix + pattern for pattern in patterns]

    def find(self, directory:str, patterns:List[str], recursive:bool = True) -> List[str]:
        """
        Find all the files that match the set of patterns passed from within the
        directory.
        Removes duplicates
        """
        patterns = self.patterns_with_prefix(directory, patterns)
        matches = [glob.glob(pattern, recursive = recursive) for pattern in patterns]
        # flattern the list
        flat = [item for result in matches for item in result]
        # remove duplicates
        return list(set(flat))

    def filter(self, exclusions:List[str], items:List[str]) -> List[str]:
        """
        Take an existing list of filename strings and return a version that
        removes any values that match against the list of exclusion patterns.
        Removes deuplicates
        """
        remove = []
        if exclusions == None or len(exclusions) == 0:
            return items

        for pattern in exclusions:
            for item in items:
                l = re.findall(pattern, item)
                if  len(l) > 0:
                    remove.append(item)
        for r in remove:
            items.remove(r)

        return list(set(items))

    def get(self, directory:str, inclusionPatterns:List[str], exclusionPatterns:List[str], recursive:bool = True) -> List[str]:
        """
        Use the directory and inclusionPatterns to find a list of files that match and
        then use the exclusionPatterns to remove any files that match those patterns.
        Duplicates will be removed.
        """
        found = self.find(directory, inclusionPatterns, recursive)
        filtered = self.filter(exclusionPatterns, found)
        return filtered
