import * as core from '@actions/core'
import { IValidateable } from "../interfaces";
import { IResult } from "../interfaces/IResult";

// Results is used to capture details about every package found
export class Result implements IResult, IValidateable{
    name:Required<string> = ''
    version:string = ''
    source:string = ''
    type:string = ''
    selector:string =''

    constructor(name?: string, version?:string, source?:string, type?:string, selector?: string){
        if(typeof name !== 'undefined') this.name = name
        if(typeof version !== 'undefined') this.version = version
        if(typeof source !== 'undefined') this.source = source
        if(typeof type !== 'undefined') this.type = type
        if(typeof selector !== 'undefined') this.selector = selector
    }

    // valididation check
    // -- only needs the name to be true
    valid(): boolean {
        let valid_name = (this.name.length > 0)
        core.debug('valid_name: ' + valid_name)
        return (valid_name)
    }

    // join the fields from extra into this one
    expand(extra: IResult): void {
        this.version = this.version + '\n' + extra.version
        this.source = this.source + '\n' + extra.source
        this.selector = this.selector + '\n' + extra.selector
        this.type = this.type + '\n' + extra.type

    }
}
