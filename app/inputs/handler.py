import argparse
import datetime
from . import validators


class handler:
    """
    Class to handle all the input variables and parsing passed to the main command.
    """
    args: argparse.Namespace
    arg_parser: argparse.ArgumentParser
    arg_parser_description: str = 'Parse a repositories manifest and lock files and return the package details.'


    def parser(self):
        """
        Construct the argument parser object
        """

        self.arg_parser = argparse.ArgumentParser(description=self.arg_parser_description)

        repo_group = self.arg_parser.add_argument_group("Repository details")
        repo_group.add_argument('--repository',
                            help='Repository name with owner, used for reporting only. For example, ministryofjustice/opg-repository-scanner',
                            required=True)

        source_group = self.arg_parser.add_argument_group("Source options.")
        source_group.add_argument('--directory',
                            help='Directory to use as the base for scanning.',
                            type=validators.readable_directory,
                            required=True)

        source_group.add_argument('--exclude',
                            help='List of folders / filepaths to exclude from all filesystem operations. This is parsed using JSON.parse to convert from a string.',
                            type=validators.json_string_to_list,
                            default='[]')


        artifact_group = self.arg_parser.add_argument_group("Artifact options.")
        artifact_group.add_argument('--artifact-name',
                            default='repository-scan-result',
                            help='The finished set of artifacts will be uploaded to this workflow under this name' )

        artifact_group.add_argument('--artifact-directory',
                            help='Location to create artifact storage directory',
                            default=f"./__artifacts/{datetime.datetime.now()}")

        return self

    def parse(self):
        """
        Parse & validate the input arguments.

        """
        args = self.arg_parser.parse_args()

        # no errors, so assign to self
        self.args = args
        return self
