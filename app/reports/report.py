from parsers import *


class report:
    """
    """


    def packages(self, repository:str, directory:str, tools:list = ['*']) -> list:
        """
        """
        packages = []
        handlers = base.handlers(tools)
        for h in handlers:
            handler = h()
            packages = handler.parse(repository, directory, handler.manifests, handler.locks, packages)
        return packages
