import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {package_file, package_file_types, manifest_and_lock} from '../../src/config'

const sample_dir: string = './__samples__/'

test('test an empty manifest_and_lock is invalid ', async () => {
    const ml = new manifest_and_lock({})
    expect(ml.valid()).toBeFalsy()
})

test('test valid_name reports true, but invalid overall as there is no manifest', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true'
    })
    expect(ml.valid_name()).toBeTruthy()
    expect(ml.valid_manifest()).toBeFalsy()
    // lock is optional, so an empty version should to true
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeFalsy()
})


test('test manifest_and_lock is valid without lock', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true',
        manifest: new package_file({
            file: 'composer.json',
            type: package_file_types.key_value_pair,
            selectors: ['.[]']
        })
    })
    expect(ml.valid_manifest()).toBeTruthy()
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()

})

test('test manifest_and_lock is invalid with an empty manifest', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true',
        manifest: new package_file({})
    })
    expect(ml.valid_manifest()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()

})

test('test manifest_and_lock is invalid with invalid manifest', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true',
        manifest: new package_file({
            type: package_file_types.key_value_pair,
            selectors: ['.[]']
        })
    })
    expect(ml.valid_manifest()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()

})

test('test valid manifest_and_lock valid with valid lock', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true',
        manifest: new package_file({
            file: 'composer.json',
            type: package_file_types.key_value_pair,
            selectors: ['.[]']
        }),
        lock: new package_file({
            file: 'composer.lock',
            type: package_file_types.key_value_pair,
            selectors: ['.[]']
        })
    })

    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()

})

test('test valid manifest_and_lock reports true with an empty lock', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true',
        manifest: new package_file({
            file: 'composer.json',
            type: package_file_types.key_value_pair,
            selectors: ['.[]']
        }),
        lock: new package_file({})
    })
    expect(ml.valid_lock()).toBeTruthy()
    expect(ml.valid()).toBeTruthy()
})

test('test valid manifest_and_lock reports false with an invalid lock', async () => {
    const ml = new manifest_and_lock({
        name: 'test-is-valid-is-true',
        manifest: new package_file({
            file: 'composer.json',
            type: package_file_types.key_value_pair,
            selectors: ['.[]']
        }),
        lock: new package_file({
            file: 'test'
        })
    })
    expect(ml.valid_lock()).toBeFalsy()
    expect(ml.valid()).toBeFalsy()
})


test('test a manifest_and_lock class successfully finding manifest files, failing to find lock files', async () => {
    const dir = sample_dir + 'app/php/laminas/'
    // test package config
    const manifest_config = {
        file: 'composer.json',
        type: package_file_types.key_value_pair,
        selectors: ['.[]']
    }
    const lock_config = {
        file: 'foo.bar',
        type: package_file_types.key_value_pair,
        selectors: ['.[]']
    }
    const manifest_pkg = new package_file(manifest_config)
    const lock_pkg = new package_file(lock_config)
    let ml = new manifest_and_lock({name: 'test', manifest: manifest_pkg, lock: lock_pkg})

    expect(ml.valid()).toBeTruthy()

    await ml.find_files(dir)
    const manifest_len = ml.manifest?.files_found?.length ?? 0
    const lock_len = ml.lock?.files_found?.length ?? 0
    // it should find a valid file for manifest
    expect(manifest_len).toBe(1)
    expect(lock_len).toBe(0)

})
