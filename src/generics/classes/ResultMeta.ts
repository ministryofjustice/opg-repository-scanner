import * as core from '@actions/core'
import { ManifestType } from '../enums';
import { IValidateable } from "../interfaces";
import { IResult } from "../interfaces/IResult";

// Results is used to capture details about every package found
export class ResultMeta {

    version:string = ''
    source:string = ''
    type:ManifestType = ManifestType.Null
    selector:string = ''

    constructor(
        version?:string,
        source?:string,
        type?:ManifestType,
        selector?:string
        ){


        if (typeof version !== 'undefined') this.version = version ?? ''
        if (typeof source !== 'undefined') this.source = source ?? ''
        if (typeof type !== 'undefined') this.type = type ?? ''
        if (typeof selector !== 'undefined') this.selector = selector ?? ''
    }

}
