import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';
import { IValidateable } from '../../generics/interfaces'

@jsonObject
export class Filesystem implements IValidateable {
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
        const valid_directory = (this.directory.length > 0)
        core.debug(`[${this.constructor.name}](valid) valid_directory: ${valid_directory}`)
        return valid_directory
    }

}
