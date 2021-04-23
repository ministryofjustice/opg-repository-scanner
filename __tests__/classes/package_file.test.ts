import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {package_file, package_file_types} from '../../src/config'

const sample_dir: string = './__samples__/'


test('test a package_file class reports true when configured correctly', async () => {
    // test package config
    const package_config = {
        file: 'composer.json',
        type: package_file_types.key_value_pair,
        selectors: ['.[]']
    }
    const pkg = new package_file(package_config)
    expect(pkg.valid_file()).toBeTruthy()
    expect(pkg.valid_type()).toBeTruthy()
    expect(pkg.valid_selectors()).toBeTruthy()
    expect(pkg.valid()).toBeTruthy()
})

test('test a package_file class reports false when configured incorrectly', async () => {
    // test package config
    const package_config = {}
    const pkg = new package_file(package_config)
    expect(pkg.valid_file()).toBeFalsy()
    expect(pkg.valid_type()).toBeFalsy()
    expect(pkg.valid_selectors()).toBeFalsy()
    expect(pkg.valid()).toBeFalsy()
})

test('test a package_file class successfully finding matching files', async () => {
    const dir = sample_dir + 'app/php/laminas/'
    // test package config
    const package_config = {
        file: 'composer.json',
        type: package_file_types.key_value_pair,
        selectors: ['.[]']
    }
    let pkg = new package_file(package_config)
    await pkg.find_files(dir)
    const len = pkg.files_found?.length ?? 0
    expect(len).toBe(1)
})


test('test a package_file class failes to matching files', async () => {
    const dir = sample_dir + 'app/go/'
    // test package config
    const package_config = {
        file: 'composer.json',
        type: package_file_types.key_value_pair,
        selectors: []
    }
    let pkg = new package_file(package_config)
    await pkg.find_files(dir)
    expect( typeof pkg.files_found ).toBe("undefined")
    const len = pkg.files_found?.length ?? 0
    expect(len).toBe(0)
})
