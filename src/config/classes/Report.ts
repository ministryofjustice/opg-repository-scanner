import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';
import { IValidateable } from '../../generics/interfaces'

@jsonObject
export class Report implements IValidateable {
    @jsonMember
    location: string = 'scan-result'

    @jsonMember
    as: string = 'json'


    constructor(location?: string, as?: string){
        if (typeof location !== 'undefined') this.location = location
        if (typeof as !== 'undefined') this.as = as
    }

    valid(): boolean{
        const valid = (this.location.length > 0)
        core.debug('valid: ' + valid)
        return valid
    }

}
