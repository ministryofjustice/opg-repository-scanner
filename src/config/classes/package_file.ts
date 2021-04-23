import * as glob from '@actions/glob'
import * as core from '@actions/core'
import {package_file_types} from '../enums'
import {base} from './base'


// class that describes what and where to find manifest / locks
// files
// - file can be an exact path or regex expression
// - type determines how the file would be processed
// - selectors is array of jq syntax to find items within the
//   the file
// - found is a list of whats been found on the file system
export class package_file extends base {
    // come from config
    file?: string
    type?: package_file_types
    selectors?: string[]
    // loaded from find_files
    files_found?: string[]

    //-- validation by field
    valid_file(): boolean {
        const valid: boolean = ( (this.file ?? '').length > 0 )
        core.debug('package_file valid_file(): ' + valid)
        return valid
    }
    valid_type(): boolean {
        const type = (this.type || package_file_types.none)
        const len:boolean = (type.length > 0)
        const known:boolean = Object.values(package_file_types).includes(type) && type !== package_file_types.none
        const valid:boolean = len && known
        core.debug('package_file valid_type(): len - ' + len)
        core.debug('package_file valid_type(): known - ' + known)
        core.debug('package_file valid_type(): valid - ' + valid)
        return valid
    }
    valid_selectors(): boolean {
        const selectors: string[] = this.selectors || []
        const valid:boolean = (selectors.length > 0)
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
            const file = (this.file ?? '')
            const pattern: string =  dir + file
            core.debug('package_file find_files(): pattern - ' + pattern)
            const globber = await glob.create(pattern, { followSymbolicLinks: follow_symlinks })
            this.files_found = await globber.glob()
        }
        // return void anyway
        return new Promise<void>((resolve) => { resolve() })
    }
}
