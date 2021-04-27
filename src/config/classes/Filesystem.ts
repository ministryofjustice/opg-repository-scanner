import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';
import { Named, Validateable } from '../../interfaces'

@jsonObject
export class Filesystem implements Validateable, Named {
    @jsonMember
    directory: string = ''

    @jsonMember
    follow_symlinks: boolean = false

    constructor(directory?: string, follow_symlinks?: boolean){
        if (typeof directory !== 'undefined')
            this.directory = directory
        if (typeof follow_symlinks !== 'undefined')
            this.follow_symlinks = follow_symlinks
    }

    valid(): boolean{
        const valid = (this.directory.length > 0)
        core.debug('Filesystem.valid(): valid = ' + valid)
        return valid
    }

    named(): string{
        return this.constructor.name
    }
}
