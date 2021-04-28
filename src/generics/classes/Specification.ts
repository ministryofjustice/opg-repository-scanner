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
            const files = await handler.files()
            const f = handler.processor
            const selectors = handler.selector

            for(const file of files){
                // create a wrapper around the async function
                const get = async (
                    content:string,
                    selector:string,
                    source:string,
                    type:string,
                    recursive?: string[]
                    ) : Promise<R[]> => {
                    return await f(content, selector, source, type, recursive)
                }
                const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string

                for(const selector of selectors){
                    const res:R[] = await get(content, selector, file, this.name, handler.recursive)
                    this._results.push(...res)
                }
            }
        }
        return new Promise< void >( (resolve) => {
            resolve()
        })
    }


}
