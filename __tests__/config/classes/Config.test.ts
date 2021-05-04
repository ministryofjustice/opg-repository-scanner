import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import { Config, } from '../../../src/config'
import { TypedJSON } from 'typedjson';

const sample_dir: string = './__samples__/'

test('test a working config object parsing', async () => {
    // test package config
    const configObj = {
        source: {
            directory: sample_dir,
            follow_symlinks: true
        },
        manifests: [{
            name: 'composer',
            uses: 'ComposerParser'
        }]
    }

    const config = TypedJSON.parse(configObj, Config) as Config

    expect(config.source.follow_symlinks).toBeTruthy()
    expect(config.source.directory).toBe(sample_dir)
    expect(config.valid_source()).toBeTruthy()
    expect(config.valid()).toBeTruthy()
})
