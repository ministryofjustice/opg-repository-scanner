import * as core from '@actions/core'
import { ManifestType } from '../enums';
import { IValidateable } from "../interfaces";
import { IResult } from "../interfaces/IResult";
import { ResultMeta } from './ResultMeta';

// Results is used to capture details about every package found
export class Result implements IResult, IValidateable{
    name:Required<string> = ''
    tags:string[] = []

    occurances:ResultMeta[] = []

    constructor(
        name?: string,
        version?:string,
        source?:string,
        type?:ManifestType,
        selector?:string,
        tags?:string[]
        ){

        if(typeof name !== 'undefined') this.name = name
        if(typeof version !== 'undefined') this.occurances.push( new ResultMeta(version, source, type, selector) )
        if(typeof tags !== 'undefined') this.tags = tags

    }

    // valididation check
    // -- only needs the name to be true
    valid(): boolean {
        let valid_name = (this.name.length > 0)
        return (valid_name)
    }

    // join the fields from extra into this one
    expand(extra: Result): void {
        this.occurances.push(...extra.occurances)
        this.tags = [...new Set([...this.tags, ...extra.tags])]

    }
}
