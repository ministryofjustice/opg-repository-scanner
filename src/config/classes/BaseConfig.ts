import * as core from '@actions/core'

import 'reflect-metadata';
import { jsonObject } from 'typedjson';

// base class to handle assignment from raw json and
// functions
@jsonObject
export class Base {
    valid(): boolean {
        return true
    }
    convert(): void { }

    // use this to see if the class has and values setup or if its an empty class
    // - means you can give properties default values
    hasValues(): boolean {
        const has_val: boolean = Object.values(this).some(v => v !== null && typeof v !== "undefined")
        core.debug('hasValues: - ' + has_val)
        return has_val
    }
}
