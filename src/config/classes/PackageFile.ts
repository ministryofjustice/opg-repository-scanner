import * as glob from '@actions/glob'
import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember} from 'typedjson';

import {PackageFileTypes} from '../enums'


// class that describes what and where to find manifest / locks
// files
// - file can be an exact path or regex expression
// - type determines how the file would be processed
// - selectors is array of jq syntax to find items within the
//   the file
// - found is a list of whats been found on the file system
@jsonObject
export class PackageFile {
    // come from config
    @jsonMember
    file: string = ''
    @jsonMember
    type: PackageFileTypes = PackageFileTypes.none
    @jsonArrayMember(String)
    selectors: string[] = []
    // loaded from find_files
    files_found: string[] = []

    //-- validation by field
    valid_file(): boolean {
        const valid: boolean = ( this.file.length > 0 )
        core.debug('package_file valid_file(): ' + valid)
        return valid
    }

    valid_type(): boolean {
        const type = this.type
        const len:boolean = (this.type.length > 0)
        const known:boolean = Object.values(PackageFileTypes).includes(type) && type !== PackageFileTypes.none
        const valid:boolean = (len && known)
        core.debug('package_file valid_type(): len - ' + len)
        core.debug('package_file valid_type(): known - ' + known)
        core.debug('package_file valid_type(): valid - ' + valid)
        return valid
    }
    valid_selectors(): boolean {
        const valid:boolean = (this.selectors.length > 0)
        core.debug('package_file valid_selectors(): valid - ' + valid)
        return valid
    }

    // only valid if file, type and selectors are setup
    valid(): boolean {
        const valid = (this.valid_file() && this.valid_type() && this.valid_selectors())
        core.debug('package_file valid(): ' + valid)
        return valid
    }

    // get the actual files from
    async find_files(base_directory: string = './', follow_symlinks:boolean = false): Promise<void> {
        core.debug('package_file find_files() starting - base_directory: ' + base_directory)
        // only run if valid
        if (this.valid()) {
            const dir = base_directory.replace(/\/+$/, '') + '/'
            const pattern: string =  dir + this.file
            core.debug('package_file find_files(): pattern - ' + pattern)
            const globber = await glob.create(pattern, { followSymbolicLinks: follow_symlinks })
            this.files_found = await globber.glob()
        }
        // return void anyway
        return new Promise<void>((resolve) => { resolve() })
    }
}
