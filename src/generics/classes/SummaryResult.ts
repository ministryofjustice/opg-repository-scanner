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


    version_from_result(result:Result) {
        // show the manifest version (where we can) and then track how many other unique versions there are
        let versions:string[] = []
        let version:string = ''
        for(const item of result.occurances) {
            versions.push(item.version)
            if(item.type == ManifestType.Manifest && version === '') version = item.version
        }
        // filter out duplicates by using set
        versions = [...new Set([...versions])]

        if( version !== '' && versions.length > 1) this.version = `${version} (+ ${versions.length} others)`
        else if ( version !== '') this.version = version
        else if( versions.length > 1 ) {
            version = versions.shift() ?? ''
            this.version = `${version} (+ ${versions.length} others)`
        } else if( versions.length > 0 )  this.version = versions.shift() ?? ''

    }

    occurances_from_result(result:Result) {
        let occurances: Map<string, number> = new Map<string, number>()
        // reduce the result occurences to counters by filepath
        for(const item of result.occurances) {
            const file = item.source
            let count:number = 0;
            if (occurances.has(file)) count = occurances.get(file) ?? 0
            count += 1
            occurances.set(file,  count)
        }
        this.occurances = map_to_object(occurances)
    }

    tag_updates(result:Result) {
        let tags = result.tags
        const first = tags.includes('is:' + ManifestType.Manifest)
        const third = tags.includes('is:' + ManifestType.Lock)

        if(first) tags.push("is:first-party")
        else if (third) tags.push("is:third-party")

        tags = [...new Set([...tags])]
        this.tags = tags
    }

    from_result(result:Result): SummaryResult{
        this.name = result.name
        this.version_from_result(result)
        this.occurances_from_result(result)
        this.tag_updates(result)
        return this
    }


}
