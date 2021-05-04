import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember} from 'typedjson';
import { IValidateable } from '../../generics/interfaces'

@jsonObject
export class Artifact implements IValidateable {
    @jsonMember
    name: string = ''

    @jsonArrayMember(String)
    as: string[] = ['json']


    constructor(name?: string, as?: string){
        if (typeof name !== 'undefined') this.name = name
        if (typeof as !== 'undefined') this.as = [as]
    }

    valid(): boolean{
        const valid = (this.name.length > 0) && (this.as.length > 0)
        return valid
    }

}
