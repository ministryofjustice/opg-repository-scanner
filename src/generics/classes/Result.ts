import * as core from '@actions/core'
import { IValidateable } from "../interfaces";
import { IResult } from "../interfaces/IResult";

export class Result implements IResult, IValidateable{
    name:Required<string> = ''
    version:string = ''
    source:string = ''
    type:string = ''

    constructor(name?: string, version?:string, source?:string, type?:string){
        if(typeof name !== 'undefined') this.name = name
        if(typeof version !== 'undefined') this.version = version
        if(typeof source !== 'undefined') this.source = source
        if(typeof type !== 'undefined') this.type = type
    }

    // valididation check
    // -- only needs the name to be true
    valid(): boolean {
        let valid_name = (this.name.length > 0)
        core.debug('valid_name: ' + valid_name)
        return (valid_name)
    }
}
