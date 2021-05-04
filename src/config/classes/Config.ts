import * as core from '@actions/core'
import 'reflect-metadata';
import {jsonObject, jsonMember, jsonArrayMember} from 'typedjson';

import {IValidateable} from '../../generics/interfaces'
import {Source} from './Source'
import {Manifest} from './Manifest'
import { Output } from './Output';

@jsonObject
export class Config implements IValidateable{

    @jsonMember(Source)
    source: Source = new Source()

    @jsonArrayMember(Manifest)
    manifests: Manifest[] = []

    @jsonArrayMember(Output, { name: 'reports'})
    output: Output[] = []

    constructor(source?: Source, manifests?: Manifest[], output?:Output[]){
        if (typeof source !== 'undefined')
            this.source = source
        if (typeof manifests !== 'undefined')
            this.manifests = manifests

        // give output a default entry
        if (typeof output !== 'undefined')
            this.output = output
        else
            this.output.push(new Output())
    }

    // validate the filesystem settings are correct
    valid_source(): boolean {
        let valid: boolean = this.source.valid()
        return valid
    }

    valid_manifests(): boolean {
        const valid_length = (this.manifests.length > 0)
        let valid_manifests = true
        for (let m of this.manifests) {
            if (!m.valid()) valid_manifests = false
        }

        return (valid_length && valid_manifests)
    }

    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid_source = this.valid_source()
        let valid_manifests = this.valid_manifests()

        core.debug(`[${this.constructor.name}](valid) valid_source: ${valid_source}`)
        core.debug(`[${this.constructor.name}](valid) valid_manifests: ${valid_manifests}`)

        return ( valid_source && valid_manifests )
    }


}
