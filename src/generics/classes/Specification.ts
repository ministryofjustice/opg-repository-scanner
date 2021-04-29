import { Filesystem } from "../../config";
import { IResult, ISpecification, ISpecificationHandler } from "../interfaces";
import * as fs from 'fs'

// Specification handles parsing of a manifest / lock file
// Uses a SpecificationHandler to get the packages out of the manifest / lock

export class Specification<T extends ISpecificationHandler, R extends IResult>
    implements ISpecification<T, R> {

    name: string = ''
    protected _handlers: T[] = []
    protected _results: R[] = []

    constructor(
        name: string,
        handlers: T[] ) {

        this.name = name
        this._handlers = handlers
    }

    handlers(): T[] {
        return this._handlers
    }

    results(): R[] {
        return this._results
    }

    // parse the specification of this manifest
    async parse(): Promise<void> {
        // go over each handler
        // find the files that match
        // process them
        for (const handler of this.handlers() ) {
            await handler.process()
            const handler_results = await handler.results() as R[]
            this._results.push(...handler_results)

        }
        return new Promise< void >( (resolve) => {
            resolve()
        })
    }


}
