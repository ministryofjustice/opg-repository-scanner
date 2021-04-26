import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember} from 'typedjson';

import { Validateable } from '../interfaces'
import { ManifestAndLock } from './ManifestAndLock'
import {Filesystem} from './Filesystem'

@jsonObject
export class Config implements Validateable{

    @jsonMember(Filesystem)
    filesystem: Filesystem = new Filesystem()

    @jsonArrayMember(ManifestAndLock)
    manifests_and_locks: ManifestAndLock[] = []

    // validate the manifest and lock array
    valid_manifest_and_locks(): boolean {
        let valid = true
        const is_array = Array.isArray(this.manifests_and_locks)
        if (is_array) {
            for (const m of this.manifests_and_locks) {
                if (!m.valid()) valid = false
            }
        } else {
            valid = false
        }
        return valid
    }
    // validate the filesystem settings are correct
    valid_filesystem(): boolean{
        let dir: boolean = (this.filesystem.directory.length > 0)
        return dir
    }
    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid_manifest = this.valid_manifest_and_locks()
        let valid_filesystem = this.valid_filesystem()

        core.debug('config valid(): valid_manifests ' + valid_manifest)
        core.debug('config valid(): valid_filesystem ' + valid_filesystem)
        return ( valid_manifest && valid_filesystem)
    }


}
