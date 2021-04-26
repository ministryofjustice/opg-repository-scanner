import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {PackageFile, PackageFileTypes} from '../../src/config'
import { TypedJSON } from 'typedjson';

const sample_dir: string = './__samples__/'

// test('test', async () => {})

test('test a package_file class reports true when configured correctly', async () => {
    // test package config
    const package_config = {
        file: 'composer.json',
        parser:  PackageFileTypes.json_key_value_pair,
        selectors: ['.[]']
    }

    const pkg = TypedJSON.parse(package_config, PackageFile) as PackageFile
    expect(pkg.valid_file()).toBeTruthy()
    expect(pkg.valid_parser()).toBeTruthy()
    expect(pkg.valid_selectors()).toBeTruthy()
    expect(pkg.valid()).toBeTruthy()
})

test('test a package_file class reports false when configured incorrectly', async () => {
    // test package config
    const package_config = {}
    const pkg = TypedJSON.parse(package_config, PackageFile) as PackageFile
    expect(pkg.valid_file()).toBeFalsy()
    expect(pkg.valid_parser()).toBeFalsy()
    expect(pkg.valid_selectors()).toBeFalsy()
    expect(pkg.valid()).toBeFalsy()
})

test('test a package_file class successfully finding matching files', async () => {
    const dir = sample_dir + 'app/php/laminas/'
    // test package config
    const package_config = {
        file: 'composer.json',
        parser:  PackageFileTypes.json_key_value_pair,
        selectors: ['.[]']
    }
    const pkg = TypedJSON.parse(package_config, PackageFile) as PackageFile
    await pkg.find_files(dir)
    const len = pkg.files_found.length
    expect(len).toBe(1)
})


test('test a package_file class failes to matching files', async () => {
    const dir = sample_dir + 'app/go/'
    // test package config
    const package_config = {
        file: 'composer.json',
        parser:  PackageFileTypes.json_key_value_pair,
        selectors: []
    }
    const pkg = TypedJSON.parse(package_config, PackageFile) as PackageFile
    await pkg.find_files(dir)
    const len = pkg.files_found.length
    expect(len).toBe(0)
})
