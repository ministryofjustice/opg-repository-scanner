import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember} from 'typedjson';

import {Validateable} from '../interfaces'
import {PackageFileParsers} from '../enums'


// class that describes what and where to find manifest / locks
// files
// - file can be an exact path or regex expression
// - type determines how the file would be processed
// - selectors is array of jq syntax to find items within the
//   the file
// - found is a list of whats been found on the file system
@jsonObject
export class PackageFile implements Validateable {
    // come from config
    @jsonMember
    file: string = ''

    @jsonMember
    parser: PackageFileParsers = PackageFileParsers.none

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

    valid_parser(): boolean {
        const parser = this.parser
        const len:boolean = (parser.length > 0)
        const known:boolean = Object.values(PackageFileParsers).includes(parser) && parser !== PackageFileParsers.none
        const valid:boolean = (len && known)
        core.debug('package_file valid_parser(): len - ' + len)
        core.debug('package_file valid_parser(): known - ' + known)
        core.debug('package_file valid_parser(): valid - ' + valid)
        return valid
    }
    valid_selectors(): boolean {
        const valid:boolean = (this.selectors.length > 0)
        core.debug('package_file valid_selectors(): valid - ' + valid)
        return valid
    }

    // only valid if file, type and selectors are setup
    valid(): boolean {
        const valid = (this.valid_file() && this.valid_parser() && this.valid_selectors())
        core.debug('package_file valid(): ' + valid)
        return valid
    }

}
