import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import { TypedJSON } from 'typedjson';

import {Filesystem} from '../../../../src/config'
import { ComposerManifestSpec } from '../../../../src/parser';

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

test('valid: valid construction returns valid() == true', async () => {
    const filesystem = new Filesystem(sample_dir, false)
    const spec = new ComposerManifestSpec(filesystem)
    expect(spec.valid()).toBeTruthy()
})

test('invalid: invalid filesystem returns valid() == false', async () => {
    const filesystem = new Filesystem('')
    const spec = new ComposerManifestSpec(filesystem)
    expect(spec.valid()).toBeFalsy()
})


test('valid: overwrite pattern matches & valid() == true', async () => {
    const filesystem = new Filesystem(sample_dir, false)
    const exact = 'app/php/laminas/composer.json'
    const spec = new ComposerManifestSpec(filesystem, exact)
    expect(spec.valid()).toBeTruthy()
    expect(spec.pattern).toEqual(exact)
})

test('invalid: overwrite pattern invalid & valid() == false', async () => {
    const filesystem = new Filesystem(sample_dir, false)
    const spec = new ComposerManifestSpec(filesystem, '')
    expect(spec.valid()).toBeFalsy()
})

test('valid: glob returns as expected', async () => {
    const filesystem = new Filesystem(sample_dir, false)
    const spec = new ComposerManifestSpec(filesystem)
    const globber = await spec.glob()
    expect(typeof globber).toEqual('object')
})

test('valid: search returns as single as expected', async () => {
    const filesystem = new Filesystem(sample_dir, false)
    const spec = new ComposerManifestSpec(filesystem, '**/php/laminas/composer.json')
    const files = await spec.search()
    expect(files.length).toEqual(1)
})
