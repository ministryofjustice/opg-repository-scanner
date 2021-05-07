import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

import {
    ComposerManifestHandler,
    ManifestSelectorsArray,
    ManifestSelectors
} from "../../../src/composer"
import { Result } from '../../../src/generics'
import { Source } from '../../../src/config'
import { ManifestType } from '../../../src/generics/enums'
import { _action_source_exclude } from '../../../src/input/action_yaml'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('postive: test a composer manifest validates', async () => {
    const dir:string = sample_dir + 'app/php/laminas/'
    const pattern:string = '**/composer.json'
    const filesys:Source = new Source(dir, false)
    const manifest = new ComposerManifestHandler(filesys, pattern, ManifestSelectorsArray)
    expect(manifest.valid()).toBeTruthy()
})

test('negative: test a composer manifest fails', async () => {
    const dir:string = sample_dir + 'app/php/laminas/'
    const pattern:string = ''
    const filesys:Source = new Source(dir, false)
    const manifest = new ComposerManifestHandler(filesys, pattern, ManifestSelectorsArray)
    expect(manifest.valid()).toBeFalsy()
})

test('postive: test a composer manifest handler finds correct files from known dir', async () => {
    let exclude = _action_source_exclude.filter(i => ( i.indexOf('__samples') < 0 ))
    const dir:string = sample_dir + 'app/php/laminas/'
    const pattern:string = '**/composer.json'
    const filesys:Source = new Source(dir, false, exclude)
    const manifest = new ComposerManifestHandler(filesys, pattern, ManifestSelectorsArray)
    const files = await manifest.files()
    expect(files.length).toEqual(1)
})

test('negative: test a composer manifest handler finds no files in missing dir', async () => {
    const dir:string = sample_dir + 'app/php/laminas-not-there/'
    const pattern:string = 'composer.json'
    const filesys:Source = new Source(dir, false)
    const manifest = new ComposerManifestHandler(filesys, pattern, ManifestSelectorsArray)
    const files = await manifest.files()
    expect(files.length).toEqual(0)
})

test('postive: test a composer manifest handler finds packages from file', async () => {
    const dir:string = sample_dir + 'app/php/laminas/'
    const pattern:string = 'composer.json'
    const file:string = dir + pattern
    const filesys:Source = new Source(dir, false)
    const manifest = new ComposerManifestHandler(filesys, pattern, ManifestSelectors.Main)

    await manifest.process()
    const results = await manifest.results()

    expect(results.length).toEqual(3)
    // check type
    const first = results.pop()
    expect(first).toBeInstanceOf(Result)
    expect(first?.occurances[0].type).toEqual(ManifestType.Manifest)
})

test('postive: test a composer manifest handler finds packages from file with multi-selectors', async () => {
    const dir:string = sample_dir + 'app/php/laminas/'
    const pattern:string = 'composer.json'
    const file:string = dir + pattern
    const filesys:Source = new Source(dir, false)
    const manifest = new ComposerManifestHandler(filesys, pattern, ManifestSelectorsArray)

    await manifest.process()
    const results = await manifest.results()

    expect(results.length).toEqual(17)

})
