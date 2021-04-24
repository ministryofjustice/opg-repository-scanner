import * as core from '@actions/core'
import { Base } from "./BaseConfig"
import { ManifestAndLock } from "./ManifestAndLock"

import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember} from 'typedjson';


@jsonObject
export class Config extends Base {
    @jsonMember
    follow_symlinks: boolean = false
    @jsonArrayMember(ManifestAndLock)
    manifests_and_locks: ManifestAndLock[] = []



    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid = true
        const is_array = this.manifests_and_locks_is_array()
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
    // so we dont have to repeat this
    manifests_and_locks_is_array(): boolean {
        const is_array: boolean = Array.isArray(this.manifests_and_locks)
        core.debug('config manifests_and_locks_is_array(): ' + is_array)
        return is_array
    }


    // load all the files for the manifests and locks based on the
    // directory passed (defaults to ./)
    async find_manifest_and_lock_files( base_directory: string = './'): Promise<void> {
        core.debug('config find_manifest_and_lock_files() starting - base_directory: ' + base_directory)
        const is_array = this.manifests_and_locks_is_array()
        if ( is_array ) {
            core.debug('config find_manifest_and_lock_files(): manifests_and_locks_is_array is true')
            let manifests = this.manifests_and_locks ?? []
            for (let m of manifests) {
                await m.find_files(base_directory, this.follow_symlinks)
            }
        }
        core.debug('config find_manifest_and_lock_files() ending')
        // return void anyway
        return new Promise<void>((resolve) => { resolve() })

    }


}
