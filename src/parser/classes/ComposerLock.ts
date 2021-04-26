import {Parser} from '../interfaces'

import * as jq from 'node-jq'
import { Result } from './Result'
import { ComposerManifest } from './ComposerManifest'

export class ComposerLock extends ComposerManifest implements Parser {

    // convert the json object passed in (content of package.json etc)
    // into a set of results
    async parse(): Promise<void> {

        for(let selector of this.package_file.selectors) {
            selector = this.sanitise_selector(selector)
            const json:string = await jq.run(
                selector, this.json_object, {input: 'json'}) as string
            const obj:object = JSON.parse(json)


        }
    }



}
