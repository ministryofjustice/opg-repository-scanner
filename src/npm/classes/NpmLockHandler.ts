import * as jq from 'node-jq'
import * as fs from 'fs'

import { IResult, ISpecificationHandler, IValidateable } from "../../generics";
import { ComposerLockHandler } from '../../composer';

export class NpmLockHandler extends ComposerLockHandler
        implements ISpecificationHandler, IValidateable {

    type:string = 'package-lock'

    // Lock files dont recurse for package-lock files
    async recurse(): Promise<void> {
        return new Promise<void>( resolve => { resolve() } )
    }

    // Package locks are like composer lock, where its more of an object,
    // so this is closer to that.
    // As the name is the key we have to overwrite 'name'
    protected iterate_results(rows:object[], source:string, selector:string): IResult[] {
        let results: IResult[] = []
        const popped = rows.pop() ?? {}
        for (const [key, item] of Object.entries(popped)) {
            let map = new Map<string, any>( Object.entries(item) )
            map.set('name', key)
            const res = this.result(map, source, selector)
            if (res !== false) results.push( res as IResult )
        }
        return results
    }

}
