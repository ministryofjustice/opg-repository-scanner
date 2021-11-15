import os

class read:
    """
    Read utilities
    """

    def is_file(self, file_path:str) -> bool:
        """
        Checks if the file_path passed along is a file and is readable

        Returns a bool
        """
        if os.path.isfile(file_path) and os.access(file_path, os.R_OK):
            return True
        return False


    def content(self, file_path:str) -> str:
        """
        If the file_path is readable, the read the content of the
        file_path and return a string
        """
        if self.is_file(file_path):
            file = open(file_path, "r")
            content = file.read()
            file.close()
            return content

        return None

    def lines(self, file_path:str) -> list:
        """
        Split file content into lines and return as a list
        """
        content = self.content(file_path)
        if content != None:
            return content.strip().split('\n')
        return []
