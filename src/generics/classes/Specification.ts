import * as core from '@actions/core'
import { IResult, ISpecification, ISpecificationHandler } from "../interfaces";

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
        core.debug(`[${this.constructor.name}](parse) >>>`)
        // go over each handler
        // find the files that match
        // process them
        core.debug(`[${this.constructor.name}](parse) interating over handlers`)
        for (const handler of this.handlers() ) {
            core.debug(`[${this.constructor.name}](parse) handler patter: ${handler.filepattern}`)
            await handler.process()
            const handler_results = await handler.results() as R[]
            this._results.push(...handler_results)

        }

        core.debug(`[${this.constructor.name}](parse) <<<`)
        return new Promise< void >( (resolve) => {
            resolve()
        })
    }


}
