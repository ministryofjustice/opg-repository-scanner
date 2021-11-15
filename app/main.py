#!/usr/bin/env python
from argparse import Namespace
import pprint
from app import reports
from inputs.handler import handler
from reports import *
pp = pprint.PrettyPrinter(indent=4)


def main():
    """
    Main execution function
    """
    io = handler()
    args = io.parser().parse().args

    report = reports.report()

    data = report.generate(args['repository'], args['directory'])
    location = report.save(args['artifact-directory'], data)

    print(f"::set-output name=artifact_directory:{location}")




if __name__ == "__main__":
    main()
