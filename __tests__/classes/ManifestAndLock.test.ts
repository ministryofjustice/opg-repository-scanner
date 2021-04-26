import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {PackageFile, PackageFileParsers, ManifestAndLock} from '../../src/config'
import { TypedJSON } from 'typedjson';

const sample_dir: string = './__samples__/'

test('test an empty manifest_and_lock is invalid ', async () => {
    const ml = new ManifestAndLock()
    expect(ml.valid()).toBeFalsy()
})

test('test valid_name reports true, but invalid overall as there is no manifest', async () => {

    const json = { name: 'test' }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock

    expect(ml.valid_name()).toBeTruthy()
    expect(ml.valid_manifest()).toBeFalsy()
    // lock is optional, so an empty version should to true
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeFalsy()
})


test('test manifest_and_lock is valid without lock', async () => {
    const json = {
        name: 'test',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        }
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    expect(ml.valid_manifest()).toBeTruthy()
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()

})

test('test manifest_and_lock is invalid with an empty manifest', async () => {
    const json = {
        name: 'test',
        manifest: {}
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    expect(ml.valid_manifest()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()

})

test('test manifest_and_lock is invalid with invalid manifest', async () => {
    const json = {
        name: 'test',
        manifest: {
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        }
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    expect(ml.valid_manifest()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()

})

test('test valid manifest_and_lock valid with valid lock', async () => {
    const json = {
        name: 'test',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        },
        lock: {
            file: 'composer.lock',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        }
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock

    expect(ml.lock?.constructor.name).toBe('PackageFile')
    expect(ml.lock).not.toBeUndefined()

    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()

})

test('test valid manifest_and_lock reports true with an empty lock', async () => {
    const json = {
        name: 'test',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        },
        lock: {}
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock

    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()
})

test('test valid manifest_and_lock reports false with an invalid lock', async () => {
    const json = {
        name: 'test',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        },
        lock: { file: 'test' }
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    expect(ml.valid_lock()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()
})



test('test empty lock reports as undefined', async () => {
    const json = {
        name: 'test',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        }
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()
    expect(ml.lock).toBeUndefined()
})
