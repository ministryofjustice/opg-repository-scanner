#!/usr/bin/env python
from argparse import Namespace
from pprint import pp
from inputs.handler import handler
from reports import report
from out import out


def main():
    """
    Main execution function
    """

    io = handler()
    args = io.parser().parse().args

    r = report()
    data = r.generate(args.repository, args.directory, args.exclude)
    location = r.save(args.artifact_directory, data)

    out.group_start("Output values")
    out.set_var("artifact_directory", location)
    out.group_end()

if __name__ == "__main__":
    main()
