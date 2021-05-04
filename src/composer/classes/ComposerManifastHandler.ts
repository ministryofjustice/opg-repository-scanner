import * as jq from 'node-jq'
import * as fs from 'fs'
import * as core from '@actions/core'

import { IResult, ISpecificationHandler, IValidateable } from "../../generics";
import { Result } from "../../generics";
import { ComposerSpecificationHandler } from './ComposerSpecificationHandler'

export class ComposerManifestHandler extends ComposerSpecificationHandler
        implements ISpecificationHandler, IValidateable {

    type:string = 'composer-json'

    // convert a map to a result
    protected result(map:Map<string, any>, source:string, selector:string) : IResult|boolean {
        if(map.has('name') && map.has('version')) {
            return new Result(
                map.get('name'),
                map.get('version'),
                source,
                this.type,
                selector
            )
        }
        return false
    }

    // get the objects that match the selector from the file
    protected async matches_selector(content: string, selector:string = ''): Promise<object[]> {
        let results:object[] = []
        if(content !== null && content.length > 0 && selector.length > 0) {
            results = await jq.run(selector, content, { output: 'json', input: 'string' }) as object[]
        }
        return new Promise<object[]>(resolve => { resolve(results) } )
    }

    // Loop over the rows (found via the matches_selector call) and find data from those
    // - as this is manifest, it comes out as key -> value
    // - put in to a map for better re-use with the lock files
    protected iterate_results(rows:object[], source:string, selector:string): IResult[] {
        let results: IResult[] = []

        for (const row of rows) {
            for( const [key, version] of Object.entries(row)) {
                const map = new Map<string, any>([ ['name', key], ['version', version] ])
                const res = this.result(map, source, selector)
                if (res !== false) results.push( res as IResult )
            }
        }
        return results
    }

    // Get content from the filepath passed in and iterate of each selector
    // Use each selector to find matching data from the file using the pattern
    // and then pass along to process the result
    protected async process_file_and_selectors(file:string, selectors:string[]): Promise<IResult[]> {
        let results: IResult[] = []
        for(const selector of selectors) {
            const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string
            const matched = await this.matches_selector(content, selector)
            const filtered = matched.filter( (i) => (i !== null && i !== undefined) )

            if (filtered !== null && filtered.length > 0) {
                const iterated = this.iterate_results(filtered, file, selector)
                results.push(...iterated)
            }
        }

        return new Promise<IResult[]>( resolve => {resolve(results) } )
    }

    // Loop over each file and pass down the selectors to be processed
    //
    protected async process_files(files:string[], selectors:string[]): Promise<IResult[]> {
        let results: IResult[] = []

        for (const file of files) {
            const found = await this.process_file_and_selectors(file, selectors)
            results.push(...found)
        }
        return new Promise<IResult[]>( resolve => {resolve(results) } )
    }


    async process(): Promise<void> {
        const files:string[] = await this.files()
        const selectors:string[] = this.selector
        const primary:IResult[] = await this.process_files(files, selectors)
        this._results.push(...primary)

        return new Promise<void>( resolve => { resolve() } )
    }
}