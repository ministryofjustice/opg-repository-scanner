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
}
