import * as core from '@actions/core'
import * as glob from '@actions/glob'
import { Filesystem } from "../../../config"
import { Named, Validateable} from '../../../interfaces'
import { Spec } from "../../interfaces"

export class ComposerManifestSpec implements Spec, Validateable, Named{
    filesystem: Filesystem = new Filesystem()
    pattern: string = '**/composer.json'

    constructor(filesystem?:Filesystem, pattern?:string, selectors?:string[]){
        this.filesystem = filesystem ?? new Filesystem()
        if (typeof pattern !== 'undefined')
            this.pattern = pattern.toString()
    }

    named():string{
        return this.constructor.name
    }

    valid(): boolean{
        const valid_filesystem = this.filesystem.valid()
        const valid_file_pattern_length = (this.pattern.length > 0)
        core.debug('valid_filesystem = ' + valid_filesystem)
        core.debug('file_pattern_length = ' + valid_file_pattern_length)
        return (valid_filesystem && valid_file_pattern_length)
    }

    async glob(): Promise<glob.Globber> {
        const pattern:string = this.filesystem.directory + this.pattern
        core.debug('pattern = ' + pattern)
        const globber = await glob.create(pattern, {followSymbolicLinks: this.filesystem.follow_symlinks})
        return new Promise<glob.Globber>( (resolve) => {
            resolve(globber)
        })
    }

    async search(): Promise<string[]> {
        const globber = await this.glob()
        const files = await globber.glob()
        return new Promise<string[]>( (resolve) => {
            resolve(files)
        })
    }




}
