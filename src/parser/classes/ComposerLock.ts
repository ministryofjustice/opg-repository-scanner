import {Parser} from '../interfaces'

import * as jq from 'node-jq'
import { Result } from './Result'
import { ComposerManifest } from './ComposerManifest'
import { PackageFile, PackageFileTypes } from '../../config'

export class ComposerLock extends ComposerManifest implements Parser {

    recursive: boolean = false
    // recursive flag allows for parsing require / require-dev of a lock package
    constructor(package_file: PackageFile , json_object: object, recursive:boolean = true){
        super(package_file, json_object)
        this.recursive = recursive
    }
    // convert an obj (in this case a single package) to map for easier access
    private obj_to_map(pkg:object): Map<string, any>{
        return new Map(Object.entries(pkg))
    }
    // generate a Result class instance from a map and local data
    private map_to_res(map:Map<string, any>, pkg:PackageFile, selector:string): Result {
        return new Result(
            pkg,
            selector,
            map.get('name') ?? '',
            map.get('version') ?? ''
        )
    }
    // fetch all the results for this package file
    async get_results(pkg:PackageFile, selector:string, packages:object[] ): Promise<Result[]>{
        let results: Result[] = []

        for(let pkgObj of packages){
            let map = this.obj_to_map(pkgObj)
            let res = this.map_to_res(map, pkg, selector)

            results.push(res)

            // now do a recursive check
            if (this.recursive){
                console.log("--> recursive parsing enabled")
                // the child elements look like manifest settings, so parse via that
                let child:ComposerManifest = new ComposerManifest(
                    pkg,
                    pkgObj,
                    PackageFileTypes.lock
                )
                let childResults = await child.parse()
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
                await this.get_results(this.package_file, selector, JSON.parse(json) )
            )

        }
        console.log('results -->', this.results)

        return new Promise<void>((resolve) => { resolve() })
    }



}
