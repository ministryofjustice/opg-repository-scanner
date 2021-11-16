import os
import json


class write:
    """

    """

    def as_json(self, file_path:str, content):
        """
        """
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "w", encoding='utf-8') as out:
            json.dump(content, out)
