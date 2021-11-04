import pytest

from inputs.validators import *


def test_readable_directory_with_invalid_path():
    with pytest.raises(ValueError) as err:
        readable_directory("./not-a-directory")
