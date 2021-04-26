import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import { Config, PackageFileParsers } from '../../../src/config'
import { TypedJSON } from 'typedjson';

const sample_dir: string = './__samples__/'

test('test a working config object parsing', async () => {
    // test package config
    const configObj = {
        filesystem: {
            directory: sample_dir,
            follow_symlinks: true
        },
        manifests_and_locks: [{
            name: 'test-manifest',
            manifest: {
                file: 'composer.json',
                parser: PackageFileParsers.json_key_value_pair,
                selectors: ['[].test']
            }
        }]
    }

    const config = TypedJSON.parse(configObj, Config) as Config

    expect(config.filesystem.follow_symlinks).toBeTruthy()
    expect(config.filesystem.directory).toBe(sample_dir)
    expect(config.valid_filesystem()).toBeTruthy()
    expect(config.valid_manifest_and_locks()).toBeTruthy()
    expect(config.valid()).toBeTruthy()
})


test('test a broken config object parsing', async () => {
    // test package config
    const configObj = {
        filesystem: {
            follow_symlinks: true
        },
        manifests_and_locks: [{
            manifest: {
                parser: PackageFileParsers.none,
                selectors: ['[].test']
            }
        }]
    }

    const config = TypedJSON.parse(configObj, Config) as Config

    expect(config.valid_filesystem()).toBeFalsy()
    expect(config.valid_manifest_and_locks()).toBeFalsy()
    expect(config.valid()).toBeFalsy()
})
