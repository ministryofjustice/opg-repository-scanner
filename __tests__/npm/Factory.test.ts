import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {
    Packages
} from "../../src/generics"
import {
    PackageParser

} from "../../src/npm"
import { Filesystem } from '../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

// test('test', async () => {})

test('postive: test construction via factory with a known file without cleanup', async () => {
    const dir = sample_dir + "app/npm/simple/"
    const filesys = new Filesystem(dir)
    let packages = PackageParser(filesys)

    expect(packages).toBeInstanceOf(Packages)
    // dont de-deup
    const res = await packages.get(false)
    expect(res.length).toEqual(5)
})


test('postive: test construction via factory with a known file with cleanup', async () => {
    const dir = sample_dir + "app/npm/simple/"
    const filesys = new Filesystem(dir)
    let packages = PackageParser(filesys)

    expect(packages).toBeInstanceOf(Packages)
    const res = await packages.get()
    expect(res.length).toEqual(3)

})
