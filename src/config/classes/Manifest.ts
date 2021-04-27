import * as core from '@actions/core'
import 'reflect-metadata';
import { jsonObject, jsonMember} from 'typedjson';
import { Named, Validateable } from '../../interfaces'
import {Parsers} from '../../parser'

@jsonObject
export class Manifest implements Validateable, Named {
    @jsonMember
    name: string = ''

    @jsonMember
    uses: string = ''

    valid(): boolean{
        const valid_name = (this.name.length > 0)
        const valid_parser = Parsers.has(this.uses)
        core.debug('Manifest.valid(): valid_name = ' + valid_name)
        core.debug('Manifest.valid(): valid_parser = ' + valid_parser)

        return (valid_name && valid_parser)
    }

    named(): string{
        return this.constructor.name
    }
}
