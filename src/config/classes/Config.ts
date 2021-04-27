import * as core from '@actions/core'
import 'reflect-metadata';
import {jsonObject, jsonMember, jsonArrayMember} from 'typedjson';
import { Named } from '../../interfaces';

import {Validateable} from '../../interfaces'
import {Filesystem} from './Filesystem'
import {Manifest} from './Manifest'

@jsonObject
export class Config implements Validateable, Named{

    @jsonMember(Filesystem)
    filesystem: Filesystem = new Filesystem()

    @jsonArrayMember(Manifest)
    manifests: Manifest[] = []


    constructor(filesystem?: Filesystem, manifests?: Manifest[]){
        if (typeof filesystem !== 'undefined')
            this.filesystem = filesystem
        if (typeof manifests !== 'undefined')
            this.manifests = manifests
    }

    named(): string{
        return this.constructor.name
    }

    // validate the filesystem settings are correct
    valid_filesystem(): boolean {
        let valid: boolean = this.filesystem.valid()
        core.debug('Config.valid_filesystem(): valid = ' + valid)
        return valid
    }

    valid_manifests(): boolean {
        const valid_length = (this.manifests.length > 0)
        let valid_manifests = true
        for (let m of this.manifests) {
            if (!m.valid()) valid_manifests = false
        }
        core.debug('Config.valid_manifests(): valid_length = ' + valid_length)
        core.debug('Config.valid_manifests(): valid_manifests = ' + valid_manifests)
        return (valid_length && valid_manifests)
    }

    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid_filesystem = this.valid_filesystem()
        let valid_manifests = this.valid_manifests()

        core.debug('Config.valid(): valid_filesystem = ' + valid_filesystem)
        core.debug('Config.valid(): valid_manifests = ' + valid_manifests)
        return ( valid_filesystem && valid_manifests )
    }


}
