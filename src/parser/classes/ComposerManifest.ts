import {Parser} from '../interfaces'

import * as jq from 'node-jq'
import { Result } from './Result'
import { PackageFile, PackageFileTypes } from '../../config'

export class ComposerManifest implements Parser {
    package_file: PackageFile = new PackageFile()
    package_type: PackageFileTypes = PackageFileTypes.manifest
    json_object: object = {}
    results: Result[] = []

    constructor(package_file?: PackageFile , json_object?: object, package_type?: PackageFileTypes)
    constructor(package_file: PackageFile , json_object: object, package_type: PackageFileTypes = PackageFileTypes.manifest){
        this.package_file = package_file
        this.json_object = json_object
        this.package_type = package_type
    }

    //
    get_results( pkg:PackageFile, selector:string, packages:object[] ): Promise<Result[]>{
        let results: Result[] = []
        for(let obj of packages){
            // create result based on the parsed object
            for (const [key, value] of Object.entries(obj)) {
                if ( obj.hasOwnProperty(key) ){
                    results.push( new Result( pkg, selector, key, value) )
                }
            }
        }
        return new Promise<Result[]>((resolve) => { resolve(results) })
    }
    // convert the json object passed in (content of package.json etc)
    // into a set of results
    async parse(): Promise<void> {
        for(let selector of this.package_file.selectors) {
            selector = this.sanitise_selector(selector)
            const json:string = await jq.run(
                selector, this.json_object, {input: 'json'}) as string

            this.add_results(
                // add [] around the parse as it comes out as a single object for the manifest file
                await this.get_results(this.package_file, selector, [ JSON.parse(json) ] )
            )
        }
        return new Promise<void>((resolve) => { resolve() })
    }

    add_results(results:Result[]): void{
        this.results.push(...results)
    }

    add_result(result:Result): void{
        this.results.push(result)
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
