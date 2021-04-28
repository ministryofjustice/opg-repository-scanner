import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import { composerManifest } from "../../../src/composer/parsers/ComposerManifest"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'


test('postive: parsed sample composer.json correctly', async () => {
    const file:string = sample_dir + 'app/php/laminas/composer.json'
    const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string

    const res = await composerManifest(content, '[.require]', file)
    expect(res.length).toEqual(3)
})


test('postive: parsed sample composer.json correctly, but invalid selector', async () => {
    const file:string = sample_dir + 'app/php/laminas/composer.json'
    const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string

    const res = await composerManifest(content, '[.package]', file)
    expect(res.length).toEqual(0)
})
