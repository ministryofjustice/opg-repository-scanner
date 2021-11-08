import os

class read:
    """
    """

    def is_file(self, file_path:str) -> bool:
        """
        """
        if os.path.isfile(file_path) and os.access(file_path, os.R_OK):
            return True
        return False


    def content(self, file_path:str) -> str:
        """
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
