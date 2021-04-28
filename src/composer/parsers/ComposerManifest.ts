import { IResult } from "../../generics";
import { Result } from "../../generics";

import * as jq from 'node-jq'
import * as fs from 'fs'
import { values } from "lodash";

// Composer.json packages are key value pairs in
// .require & .require-dev
export async function composerManifest(
    content:string,
    selector:string,
    source:string,
    type:string = 'manifest',
    recursive_selectors?:string[]
    ): Promise<IResult[]> {

    /* eslint-disable no-console */
    let results:Result[] = []
    let res:object[] = await jq.run(selector, content, { output: 'json', input: 'string' }) as object[]

    // as we're forcing an array, remove empty versions
    res = res.filter( (i) => (i !== null && i !== undefined) )

    if (res !== null && res.length > 0) {
        for (const row of res) {
            // row will be the object, so loop over the entries to get key & value
            for( const [key, value] of Object.entries(row)) {
                const res:Result = new Result(
                    key,
                    value,
                    source,
                    type
                )
                results.push(res)
            }
        }
    }

    return new Promise<IResult[]>((resolve) => {
        resolve(results)
    })
    /* eslint-enable no-console */

}
