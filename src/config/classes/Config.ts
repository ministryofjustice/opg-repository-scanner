import * as core from '@actions/core'
import 'reflect-metadata';
import {jsonObject, jsonMember, jsonArrayMember} from 'typedjson';

import {IValidateable} from '../../generics/interfaces'
import {Filesystem} from './Filesystem'
import {Manifest} from './Manifest'
import { Output } from './Output';

@jsonObject
export class Config implements IValidateable{

    @jsonMember(Filesystem)
    filesystem: Filesystem = new Filesystem()

    @jsonArrayMember(Manifest)
    manifests: Manifest[] = []

    @jsonArrayMember(Output)
    output: Output[] = []

    constructor(filesystem?: Filesystem, manifests?: Manifest[], output?:Output[]){
        if (typeof filesystem !== 'undefined')
            this.filesystem = filesystem
        if (typeof manifests !== 'undefined')
            this.manifests = manifests

        // give output a default entry
        if (typeof output !== 'undefined')
            this.output = output
        else
            this.output.push(new Output())
    }

    // validate the filesystem settings are correct
    valid_filesystem(): boolean {
        let valid_filesystem: boolean = this.filesystem.valid()
        return valid_filesystem
    }

    valid_manifests(): boolean {
        const valid_length = (this.manifests.length > 0)
        let valid_manifests = true
        for (let m of this.manifests) {
            if (!m.valid()) valid_manifests = false
        }
        core.debug(`[${this.constructor.name}](valid_manifests) valid_length: ${valid_length}`)
        core.debug(`[${this.constructor.name}](valid_manifests) valid_length: ${valid_manifests}`)
        return (valid_length && valid_manifests)
    }

    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid_filesystem = this.valid_filesystem()
        let valid_manifests = this.valid_manifests()

        core.debug(`[${this.constructor.name}](valid) valid_filesystem: ${valid_filesystem}`)
        core.debug(`[${this.constructor.name}](valid) valid_manifests: ${valid_manifests}`)

        return ( valid_filesystem && valid_manifests )
    }


}
