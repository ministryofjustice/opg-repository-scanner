import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { Source } from '../../../src/config'
import { TypedJSON } from 'typedjson';

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'
// Test that an exclusion of entire directory should blank out
// the main lookup
test('valid: Test conversion from object to class', async () => {
    // test package config
    const filesystemObj = {
        directory: sample_dir,
        follow_symlinks: true
    }
    const filesystem = TypedJSON.parse(filesystemObj, Source) as Source
    expect(filesystem.valid()).toBeTruthy()
    expect(filesystem.follow_symlinks).toBeTruthy()
    expect(filesystem.directory).toBe(sample_dir)

})

test('valid: Test construction', async () => {
    const filesystem = new Source(sample_dir, true)
    expect(filesystem.valid()).toBeTruthy()
    expect(filesystem.follow_symlinks).toBeTruthy()
    expect(filesystem.directory).toBe(sample_dir)

})
