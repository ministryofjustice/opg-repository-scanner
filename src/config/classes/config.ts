import * as core from '@actions/core'
import { base } from "./base"
import { manifest_and_lock } from "./manifest_and_lock"

// As the config class is pulled from a yaml file and uses
// Object.assign it has a conversion method to ensure
export class config extends base {
    follow_symlinks?: boolean
    manifests_and_locks?: manifest_and_lock[]

    // ensure this is a valid class and contains all we want
    valid(): boolean {
        let valid = true
        const is_array = this.manifests_and_locks_is_array()
        if (is_array) {
            const existing = this.manifests_and_locks ?? []
            for (const m of existing) {
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

    // Fix this. to be classes correctly
    convert(): void {
        core.debug('config convert(): starting')
        const is_array = this.manifests_and_locks_is_array()
        // if it has not detected the symlinks setting, default to false
        if (typeof this.follow_symlinks === undefined){
            core.debug('config convert(): follow_symlinks defaulting to false')
            this.follow_symlinks = false
        }
        // only try to parse if this is an array
        if (is_array) {
            core.debug('config convert(): manifests_and_locks_is_array is true')
            const existing = this.manifests_and_locks ?? []
            const manifest_classes: manifest_and_lock[] = []

            for (const item of existing) {
                const m = new manifest_and_lock(item)
                manifest_classes.push(m)
            }
            this.manifests_and_locks = manifest_classes
        }
        core.debug('config convert(): ending')
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
