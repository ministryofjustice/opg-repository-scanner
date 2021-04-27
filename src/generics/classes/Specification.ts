import { Filesystem } from "../../config";
import { IResult, ISpecification, ISpecificationHandler } from "../interfaces";
import * as fs from 'fs'

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
            const selector = handler.selector

            for(const file of files){
                // create a wrapper around the async function
                const get = async (content:string, selector:string, source:string) : Promise<R[]> => {
                    return await f(content, selector, source)
                }
                const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string
                const res:R[] = await get(content, selector, file)
                this._results.push(...res)

            }
        }
        return new Promise< void >( (resolve) => {
            resolve()
        })
    }


}
