import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { Result } from "../../../src/generics/classes/Result"

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

test('test', async () => {})

test('positve: test empty result should be invalid', async () => {
    const res = new Result()
    expect(res.valid()).toBeFalsy()
})

test('positve: test result with just a name should be true', async () => {
    const res = new Result('testr', 'test-name')
    expect(res.valid()).toBeTruthy()
})
