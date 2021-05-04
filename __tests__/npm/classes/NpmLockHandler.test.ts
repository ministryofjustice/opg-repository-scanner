import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import {
    NpmLockHandler,
    LockSelectorsArray
} from "../../../src/npm"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('postive: test a npm lock validates', async () => {
    const dir:string = sample_dir + 'app/npm/simple/'
    const pattern:string = '**/package-lock.json'
    const filesys:Filesystem = new Filesystem(dir, false)
    const lock = new NpmLockHandler(filesys, pattern, LockSelectorsArray)

    expect(lock.valid()).toBeTruthy()
})


test('postive: test a npm lock parsing on a nuxt & vue combo', async () => {
    const dir:string = sample_dir + 'app/npm/nuxt/'
    const pattern:string = '**/package-lock.json'
    const filesys:Filesystem = new Filesystem(dir, false)
    const lock = new NpmLockHandler(filesys, pattern, LockSelectorsArray)

    await lock.process()
    let res = await lock.results()

    expect(res.length).toBeGreaterThan(880)



})
