import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import {
    ComposerLockHandler,
    LockSelectorsRecursiveArray,
    LockSelectorsArray
} from "../../../src/composer"
import { Result } from '../../../src/generics'
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('postive: test a composer lock handler finds all packages from file without recursion', async () => {
    const dir:string = sample_dir + 'app/php/doctrine-instantiator/'
    const pattern:string = 'composer.lock'
    const file:string = dir + pattern
    const filesys:Filesystem = new Filesystem(dir, false)
    const lock = new ComposerLockHandler(filesys, pattern, LockSelectorsArray)

    await lock.process()
    const results = await lock.results()
    expect(results.length).toEqual(1)
    // check type
    const first = results.pop()
    expect(first).toBeInstanceOf(Result)
    expect(first?.name).toEqual('doctrine/instantiator')
    expect(first?.type).toEqual('composer-lock')
})


test('postive: test a composer lock handler finds all packages from file with recursion', async () => {
    const dir:string = sample_dir + 'app/php/doctrine-instantiator/'
    const pattern:string = 'composer.lock'
    const file:string = dir + pattern
    const filesys:Filesystem = new Filesystem(dir, false)
    const lock = new ComposerLockHandler(filesys, pattern, LockSelectorsArray, LockSelectorsRecursiveArray)

    await lock.process()
    const results = await lock.results()
    expect(results.length).toEqual(9)



})
