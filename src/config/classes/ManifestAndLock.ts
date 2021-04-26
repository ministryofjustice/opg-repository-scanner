import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';

import {Validateable} from '../interfaces'
import {PackageFile} from './PackageFile'


// class describes the name (like composer), its manifest & lock files
@jsonObject
export class ManifestAndLock implements Validateable{
    @jsonMember(String)
    name: string = ''
    @jsonMember(PackageFile)
    manifest: PackageFile = new PackageFile()
    @jsonMember(PackageFile)
    lock?: PackageFile

    //--- validation for each part of the class
    valid_name(): boolean {
        const valid: boolean = ( this.name.length > 0 )
        core.debug('manifest_and_lock valid_name(): ' + valid)
        return valid
    }
    valid_manifest(): boolean {
        const valid: boolean = this.manifest.valid()
        core.debug('manifest_and_lock valid_manifest(): ' + valid)
        return valid
    }
    // lock is optional, so harder to validate
    // - true = undefined | not set at all
    // - true = instance of packagefile, but name is empty
    // - true = instance of packagefile, with a name and passes .valid()
    valid_lock(): boolean {
        const is_instance = (this.lock instanceof PackageFile)
        const undef = (typeof this.lock == 'undefined')
        let valid:boolean = true
        core.debug('manifest_and_lock valid_lock(): is_instance ' + is_instance)
        core.debug('manifest_and_lock valid_lock(): undefined ' + undef)
        let file: string = (this.lock?.file ?? '')
        if (file.length > 0) {
            valid = this.lock?.valid() ?? false
        }
        valid = ( (is_instance || undef) && valid )
        core.debug('manifest_and_lock valid_lock(): ' + valid)
        return valid
    }

    // overall is valid check
    valid(): boolean {
        const valid = this.valid_name() && this.valid_manifest() && this.valid_lock()
        core.debug('manifest_and_lock valid(): ' + valid)
        return valid
    }


}
