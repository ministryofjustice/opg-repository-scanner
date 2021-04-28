import { IResult } from "../../generics";
import { Result } from "../../generics";

import * as jq from 'node-jq'
import * as fs from 'fs'
import { values } from "lodash";
import { composerManifest } from "./ComposerManifest";


// handle the recursive lock call to manifest processes
async function handleRecursive(
    content:string,
    source:string,
    selectors?:string[]
): Promise<IResult[]> {
    let results:IResult[] = []
    /* eslint-disable no-console */
    if (typeof selectors !== 'undefined' && selectors.length > 0){
        for (const selector of selectors){
            let found:IResult[] = await composerManifest(
                content,
                selector,
                source,
                'third-party'
            )
            if(found.length > 0) results.push(...found)
        }
    }
    return new Promise<IResult[]>((resolve) => {
        resolve(results)
    })
    /* eslint-enable no-console */
}

// Composer.json packages are key value pairs in
// .require & .require-dev
export async function composerLock(
    content:string,
    selector:string,
    source:string,
    type:string = 'lock',
    recursive_selectors?:string[]): Promise<IResult[]> {

    /* eslint-disable no-console */
    let results:Result[] = []
    let res:object[] = await jq.run(selector, content, { output: 'json', input: 'string' }) as object[]
    // as we're forcing an array, remove empty versions
    res = res.filter( (i) => (i !== null && i !== undefined) )

    if (res !== null && res.length > 0){
        // loop over each item in the force array
        for (const row of res) {
            // convert
            for (const [key, item] of Object.entries(row) ) {
                const map = new Map<string, any>( Object.entries(item) )
                // if the converted map has both name & version then store as a result
                if (map.has('name') && map.has('version') ) {
                    const res:Result = new Result(
                        map.get('name'),
                        map.get('version'),
                        source,
                        type
                    )
                    results.push(res)
                    // Deal with recursive elements of composer lock files
                    let recursive:Result[] = await handleRecursive(content, source, recursive_selectors) as Result[]
                    if (recursive.length > 0 ) results.push( ...recursive )
                }

            }

        }

    }

    return new Promise<IResult[]>((resolve) => {
        resolve(results)
    })
    /* eslint-enable no-console */
}
