import * as core from '@actions/core'
import 'reflect-metadata';
import {jsonObject, jsonMember, jsonArrayMember} from 'typedjson';

import {IValidateable} from '../../generics/interfaces'
import {Source} from './Source'
import {Manifest} from './Manifest'
import { Artifact } from './Artifact';

@jsonObject
export class Config implements IValidateable{

    @jsonMember(String)
    repository: string = ''

    @jsonMember(Source)
    source: Source = new Source()

    @jsonArrayMember(Manifest)
    manifests: Manifest[] = []

    @jsonMember(Artifact)
    artifact: Artifact = new Artifact

    constructor(source?: Source, manifests?: Manifest[], artifact?:Artifact, repository?:string){
        if (typeof source !== 'undefined')
            this.source = source
        if (typeof manifests !== 'undefined')
            this.manifests = manifests

        // give output a default entry
        if (typeof artifact !== 'undefined') this.artifact = artifact
        // add the repo name
        if (typeof repository !== 'undefined') this.repository = repository
    }

    // validate the filesystem settings are correct
    valid_source(): boolean {
        const valid: boolean = this.source.valid()
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
