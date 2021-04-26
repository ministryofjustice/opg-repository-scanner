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

    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid = true
        const is_array = Array.isArray(this.manifests_and_locks)
        if (is_array) {
            for (const m of this.manifests_and_locks) {
                if (!m.valid()) valid = false
            }
        } else {
            valid = false
        }
        core.debug('config valid(): ' + valid)
        return valid
    }


}
