import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';
import { IValidateable } from '../../generics'


@jsonObject
export class Manifest implements IValidateable {
    @jsonMember
    name: string = ''

    @jsonMember
    uses: string = ''

    valid(): boolean{
        core.debug(`[${this.constructor.name}](valid) >>>`)
        const valid_name = (this.name.length > 0)
        core.debug(`[${this.constructor.name}](valid) valid_name: ${valid_name}`)
        core.debug(`[${this.constructor.name}](valid) >>>`)
        return (valid_name)
    }


}
