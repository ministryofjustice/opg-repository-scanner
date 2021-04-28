import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import { composerLock } from "../../../src/composer/parsers/ComposerLock"
import { LockSelectors, LockSelectorsRecursive } from "../../../src/composer/selectors"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

// test('postive: parsed sample composer.lock correctly', async () => {
//     const file:string = sample_dir + 'app/php/laminas/composer.lock'
//     const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string

//     const res = await composerLock(content, '[.packages]', file, 'testlock')
//     expect(res.length).toBeGreaterThan(1)
// })


test('postive: parsed sample composer.lock correctly with recursion', async () => {
    const file:string = sample_dir + 'app/php/laminas/composer.lock'
    const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'}) as string

    const recursive:string[] = [
        LockSelectorsRecursive.PackageDevRequireDev
    ]
    const res = await composerLock(content, LockSelectors.Main, file, 'testlock', recursive)
    expect(res.length).toBeGreaterThan(5)
})
