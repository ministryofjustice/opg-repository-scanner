import * as core from '@actions/core'
import {package_file_types} from '../enums'
import {package_file} from './package_file'
import {base} from './base'


// class describes the name (like composer), its manifest & lock files
export class manifest_and_lock extends base {
    name?: string
    manifest?: package_file
    lock?: package_file

    //--- validation for each part of the class
    valid_name(): boolean {
        const valid: boolean = ( (this.name ?? '').length > 0 )
        core.debug('manifest_and_lock valid_name(): ' + valid)
        return valid
    }
    valid_manifest(): boolean {
        const valid: boolean = (this.manifest?.valid() ?? false)
        core.debug('manifest_and_lock valid_manifest(): ' + valid)
        return valid
    }
    valid_lock(): boolean {
        const hasValues: boolean = this.lock?.hasValues() ?? false
        // as lock is optional, if it reports no values then presume
        // its not been set and we're just getting an empty class
        if (!hasValues) {
            core.debug('manifest_and_lock valid_lock(): no values - ' + true)
            return true
        }
        const valid = this.lock?.valid() ?? false
        core.debug('manifest_and_lock valid_lock(): ' + valid)
        return valid
    }

    // overall is valid check
    valid(): boolean {
        const valid = this.valid_name() && this.valid_manifest() && this.valid_lock()
        core.debug('manifest_and_lock valid(): ' + valid)
        return valid
    }
    // fix package files being classes
    convert(): void {
        core.debug('manifest_and_lock convert() starting')
        const manifest = this.manifest || {}
        const lock = this.lock || {}
        this.manifest = new package_file(manifest)
        this.lock = new package_file(lock)
        core.debug('manifest_and_lock convert() ending')
    }

    // find the files for both manifest & lock
    async find_files(base_directory: string = './', follow_symlinks:boolean = false) : Promise<void> {
        core.debug('manifest_and_lock find_files() starting - base_directory: ' + base_directory)
        await this.manifest?.find_files(base_directory, follow_symlinks)
        await this.lock?.find_files(base_directory, follow_symlinks)
        core.debug('manifest_and_lock find_files() ending')
        // return void anyway
        return new Promise<void>((resolve) => { resolve() })
    }
}
