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

    const json = { name: 'test-is-valid-is-true' }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock

    expect(ml.valid_name()).toBeTruthy()
    expect(ml.valid_manifest()).toBeFalsy()
    // lock is optional, so an empty version should to true
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeFalsy()
})


test('test manifest_and_lock is valid without lock', async () => {
    const json = {
        name: 'test-is-valid-is-true',
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
        name: 'test-is-valid-is-true',
        manifest: {}
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    expect(ml.valid_manifest()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()

})

test('test manifest_and_lock is invalid with invalid manifest', async () => {
    const json = {
        name: 'test-is-valid-is-true',
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
        name: 'test-is-valid-is-true',
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

    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()

})

test('test valid manifest_and_lock reports true with an empty lock', async () => {
    const json = {
        name: 'test-is-valid-is-true',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        },
        lock: {}
    }
    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock
    console.log("--->", ml)
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()
})

test('test valid manifest_and_lock reports false with an invalid lock', async () => {
    const json = {
        name: 'test-is-valid-is-true',
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


test('test a manifest_and_lock class successfully finding manifest files, failing to find lock files', async () => {
    const dir = sample_dir + 'app/php/laminas/'

    const json = {
        name: 'test',
        manifest: {
            file: 'composer.json',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        },
        lock: {
            file: 'foo.bar',
            parser: PackageFileParsers.json_key_value_pair,
            selectors: ['.[]']
        }
    }

    const ml = TypedJSON.parse(json, ManifestAndLock) as ManifestAndLock

    expect(ml.valid()).toBeTruthy()

    await ml.find_files(dir)
    const manifest_len = ml.manifest?.files_found?.length ?? 0
    const lock_len = ml.lock?.files_found?.length ?? 0
    // it should find a valid file for manifest
    expect(manifest_len).toBe(1)
    expect(lock_len).toBe(0)

})
