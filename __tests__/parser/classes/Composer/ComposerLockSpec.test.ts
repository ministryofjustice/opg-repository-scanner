import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {Filesystem} from '../../../../src/config'
import {ComposerLockSpec} from '../../../../src/parser'
// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

test('valid: check differences from ComposerManifestSpec', async () => {
    const filesystem = new Filesystem(sample_dir, false)
    const spec = new ComposerLockSpec(filesystem)
    expect(spec.valid()).toBeTruthy()
    expect(spec.pattern).toEqual('**/composer.lock')
})
