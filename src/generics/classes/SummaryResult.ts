import * as core from '@actions/core'
import { map_to_object } from '../../conversion/map_to_object';
import { ManifestType } from '../enums';
import { Result } from './Result';

// Results is used to capture details about every package found
export class SummaryResult{
    name:Required<string> = ''
    version:string = ''
    tags:string[] = []


    occurances:object = {}


    from_result(result:Result): SummaryResult{
        this.name = result.name
        this.tags = result.tags
        let occurances: Map<string, number> = new Map<string, number>()
        /* eslint-disable no-console */

        // try and find the manifest version or just use the first occurance
        const manifest = result.occurances.filter(i => i.type === ManifestType.Manifest).shift()
        if (typeof manifest !== 'undefined') this.version = manifest.version
        else this.version = result.occurances.shift()?.version ?? ''

        // reduce the result occurences to counters by filepath
        for(const item of result.occurances) {
            const file = item.source
            let count:number = 0;
            if (occurances.has(file)) count = occurances.get(file) ?? 0
            count += 1
            occurances.set(file,  count)
        }
        this.occurances = map_to_object(occurances)

        /* eslint-enable no-console */
        return this
    }


}
