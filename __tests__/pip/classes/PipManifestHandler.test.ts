import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import {
    PipManifestHandler,
    ManifestSelectorsArray,
} from "../../../src/pip"
import { Result } from '../../../src/generics'
import { Source } from '../../../src/config'
import { ManifestType } from '../../../src/generics/enums'
import { PipPatterns } from '../../../src/pip/patterns'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'


test('postive: test a pip manifest validates', async () => {
    const dir:string = sample_dir + 'app/python/pip/'
    const pattern:string = PipPatterns.Manifest
    const filesys:Source = new Source(dir, false)
    const manifest = new PipManifestHandler(filesys, pattern)
    expect(manifest.valid()).toBeTruthy()
})



test('postive: test a pip manifest handler finds correct files from known dir', async () => {
    const dir:string = sample_dir + 'app/python/pip/'
    const pattern:string = PipPatterns.Manifest
    const filesys:Source = new Source(dir, false)
    const manifest = new PipManifestHandler(filesys, pattern)
    const files = await manifest.files()
    expect(files.length).toEqual(1)
})



test('postive: test a pip manifest handler finds packages from file', async () => {
    const dir:string = sample_dir + 'app/python/pip/'
    const pattern:string = PipPatterns.Manifest
    const file:string = dir + pattern
    const filesys:Source = new Source(dir, false)
    const manifest = new PipManifestHandler(filesys, pattern)

    await manifest.process()
    const results = await manifest.results()

    expect(results.length).toEqual(7)
    // check type
    const first = results.pop()
    expect(first).toBeInstanceOf(Result)
    expect(first?.occurances[0].type).toEqual(ManifestType.Manifest)
})
