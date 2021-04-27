import { IResult } from "../../generics";
import { Result } from "../../generics";

import * as jq from 'node-jq'
import * as fs from 'fs'
import { values } from "lodash";

// Composer.json packages are key value pairs in
// .require & .require-dev
export async function composerManifest(content:string, selector:string, source:string, type:string = 'first-party'): Promise<IResult[]> {
    let results:Result[] = []
    const obj = JSON.parse(content)
    const res = await jq.run(selector, content, { output: 'json', input: 'string' }) as object

    // res will be the object, so loop over the entries to get key & value
    for( const [key, value] of Object.entries(res)) {
        const res = new Result(
            key,
            value,
            source,
            type
        )
        results.push(res)
    }

    return new Promise<IResult[]>((resolve) => {
        /* eslint-disable no-console */
        console.log("--> composer", obj)
        console.log("--> results", results)
        /* eslint-enable no-console */

        resolve(results)
    })

}
