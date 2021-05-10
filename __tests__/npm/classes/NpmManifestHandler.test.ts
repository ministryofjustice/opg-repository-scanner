import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import {
    NpmManifestHandler,
    ManifestSelectorsArray
} from "../../../src/npm"
import { Source } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('postive: test a npm manifest validates', async () => {
    const dir:string = sample_dir + 'app/npm/simple/'
    const pattern:string = '**/package.json'
    const filesys:Source = new Source(dir, false)
    const manifest = new NpmManifestHandler('testr',filesys, pattern, ManifestSelectorsArray)

    const files = await manifest.files()
    expect(files.length).toEqual(1)
})



test('postive: test a npm manifest finds all packages', async () => {
    const dir:string = sample_dir + 'app/npm/simple/'
    const pattern:string = '**/package.json'
    const filesys:Source = new Source(dir, false)
    const manifest = new NpmManifestHandler('testr',filesys, pattern, ManifestSelectorsArray)

    expect(manifest.valid()).toBeTruthy()
    await manifest.process()
    const res = await manifest.results()
    expect(res.length).toEqual(2)
})
