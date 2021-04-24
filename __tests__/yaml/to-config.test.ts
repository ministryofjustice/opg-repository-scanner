import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import * as glob from '@actions/glob'
import {error_messages, yaml_to_config} from '../../src/yaml'
import {ManifestAndLock, Config} from '../../src/config'


const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('test a valid sample yaml file converts to object', async () => {
    const file = sample_dir + 'config/valid/simple.yml'
    const obj: Config = await yaml_to_config(file)
    const manifests = obj.manifests_and_locks || []
    const valid: boolean = obj.valid()
    // should be of correct type
    expect(obj.constructor.name).toBe(Config.name)
    // should be valid
    expect(valid).toBe(true)
    // manifests should have length of 2 for this file
    expect(manifests.length).toBe(2)
    // first item in the array should be a manifest_and_lock
    const first = manifests[0] || {}
    expect(first.constructor.name).toBe(ManifestAndLock.name)

})


test('test symlink settings are mapped', async () => {
    const postive_file = sample_dir + 'config/valid/simple.yml'
    const negative_file = sample_dir + 'config/valid/single.yml'
    const positive: Config = await yaml_to_config(postive_file)
    const negative: Config = await yaml_to_config(negative_file)
    // this config should be set to follow symlinks
    expect(positive.follow_symlinks).toBeTruthy()
    expect(negative.follow_symlinks).toBeFalsy()

})
// loop over all invalid yaml files and ensure they generate a single
// error for each one
test('error: yaml files with errors within them', async () => {
    const expression = sample_dir + 'config/invalid/**/*.yml'
    const globber = await glob.create(expression, {followSymbolicLinks: false})
    const files = await globber.glob()

    // all of these files should fail
    expect.assertions(files.length)
    for (let f of files) {
        try {
            const obj: Config = await yaml_to_config(f)
        } catch (e) {
            expect(e.message).toEqual(error_messages.yaml_to_config)
        }
    }
})
