#!/usr/bin/env python
from argparse import Namespace
from pprint import pp
from inputs.handler import handler
from reports import report



def main():
    """
    Main execution function
    """
    io = handler()
    args = io.parser().parse().args

    r = report()

    data = r.generate(args.repository, args.directory, args.exclude)
    location = r.save(args.artifact_directory, data)

    print(f"::set-output name=artifact_directory:{location}")




if __name__ == "__main__":
    main()
