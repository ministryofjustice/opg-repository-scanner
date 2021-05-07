import * as core from '@actions/core'
import { map_to_object } from '../../conversion/map_to_object';
import { ManifestType } from '../enums';
import { Result } from './Result';
import { ResultMeta } from './ResultMeta';

// Results is used to capture details about every package found
export class SummaryResult{
    name:Required<string> = ''
    version:string = ''
    tags:string[] = []
    occurances:object[] = []

    private _source_data:Map<string, number> = new Map<string,number>()
    // set this.version based on summarised data from result.occurances
    // - get unique version strings, show the first and then count for
    //   how many extra versions were found
    version_from_result(result:Result) {
        this.version = ''
        // find all the versions from the occurances data
        let versions:string[] = result.occurances.map(i => i.version)
        // remove duplicates
        versions = [... new Set(versions)]
        // set this version
        if (versions.length > 1) this.version = `${versions.shift()} (+ ${versions.length} others)`
        else if (versions.length > 0) this.version = versions.shift() ?? ''
    }

    // sources returns a Map of unique sources with a counter
    sources(result?:Result): Map<string, number>{
        if (typeof result !== 'undefined') {
            this._source_data = result.occurances.reduce(
                (map, e) => map.set(e.source, (map.get(e.source) || 0) + 1),
                new Map()
            )
        }
        return this._source_data
    }
    // convert sources to an array of flat strings
    occurances_to_string_array(sources:Map<string,number>): string[] {
        return Array.from(sources, ([name, count]) => (`${name} (count: ${count})`) );
    }
    // convert sources to an array of objects with name & count
    occurances_to_object_array(sources:Map<string,number>): object[] {
        return Array.from(sources, ([name, count]) => ({ name, count }));
    }

    // convert occurances to an object for json output
    occurances_from_result(sources:Map<string,number>) {
        // get just the sources and convert to an object for reporting
        this.occurances = this.occurances_to_object_array( sources )
    }

    // helper functions to check if this result was directly installed by
    // the dev within the manifest
    is_first_party(result:Result):boolean{
        return result.tags.includes(ManifestType.Manifest)
    }
    // helper functions to check if this result was installed as a dependancy
    is_third_party(result:Result):boolean{
        return result.tags.includes(ManifestType.Lock)
    }

    // Update result tags to include first/third party tag
    tag_updates(result:Result) {
        let tags = result.tags
        if(this.is_first_party(result) ) tags.push("first-party")
        else if(this.is_third_party(result) ) tags.push("third-party")
        // remove duplicates
        this.tags = [...new Set([...tags])]
    }

    // create data on this class based on a standard Result
    from_result(result:Result): SummaryResult{
        this.name = result.name
        this.sources(result)

        this.version_from_result(result)
        this.occurances_from_result(this._source_data)
        this.tag_updates(result)
        return this
    }




}
