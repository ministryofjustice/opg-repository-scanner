#!/usr/bin/env python
from argparse import Namespace
import pprint
from inputs.handler import handler
pp = pprint.PrettyPrinter(indent=4)


def main():
    """
    Main execution function
    """
    io = handler()
    args = io.parser().parse().args
    pp.pprint(args)




if __name__ == "__main__":
    main()
