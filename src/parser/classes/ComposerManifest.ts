import {Parser} from '../interfaces'

import * as jq from 'node-jq'
import { Result } from './Result'
import { PackageFile, PackageFileTypes } from '../../config'

export class ComposerManifest implements Parser {
    package_file: PackageFile = new PackageFile()
    package_type: PackageFileTypes = PackageFileTypes.none
    json_object: object = {}
    results: Result[] = []

    constructor(package_file?: PackageFile , package_type?:PackageFileTypes, json_object?: object)
    constructor(package_file: PackageFile , package_type:PackageFileTypes, json_object: object){
        this.package_file = package_file
        this.package_type = package_type
        this.json_object = json_object
    }
    // convert the json object passed in (content of package.json etc)
    // into a set of results
    async parse(): Promise<void> {

        for(let selector of this.package_file.selectors) {
            selector = this.sanitise_selector(selector)
            const json:string = await jq.run(
                selector, this.json_object, {input: 'json'}) as string
            const obj:object = JSON.parse(json)
            // create result based on the parsed object
            for (const [key, value] of Object.entries(obj)) {
                if ( obj.hasOwnProperty(key) ){
                    let res: Result = new Result(
                        this.package_file, selector, key, value)
                    this.results.push(res)
                }
            }

        }
    }

    // there are certain chars that need escaping
    // - for example '-' needs to be wrapped in double quotes
    sanitise_selector(selector:string): string{
        let updated:string = selector
        //
        if (selector.indexOf("-")){
            let exploded = selector.split('.').filter(i => i)
            updated = exploded.map(i => `."${i}"`).join();
        }

        return updated
    }



}
