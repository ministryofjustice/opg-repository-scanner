import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {
    SpecificationHandler,
    Specification,
    Result,
    Packages
} from "../../src/generics"
import {
    ComposerLockHandler,
    ComposerManifestHandler,

    LockSelectorsRecursive,
    ManifestSelectorsArray,
    LockSelectorsRecursiveArray,
    LockSelectorsArray,

    ComposerParser

} from "../../src/composer"
import { Source } from '../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

// test('test', async () => {})

test('postive: test construction raw and reporting with a known & small file', async () => {
    const filesys = new Source(sample_dir)
    // custom locations for the test using known packages (and small numbers)
    const mFile:string = "app/php/doctrine-instantiator/sub-folder/composer.json"
    const mName:string = 'composer-manifest-spec'
    const lFile:string = "app/php/doctrine-instantiator/sub-folder/composer.lock"
    const lName:string = 'composer-lock-spec'

    // handlers to load a file
    const manifestHandler = new ComposerManifestHandler(
        'testr',
        filesys,
        mFile,
        ManifestSelectorsArray
    )

    const lockHandler = new ComposerLockHandler(
        'testr',
        filesys,
        lFile,
        LockSelectorsArray,
        LockSelectorsRecursiveArray
    )

    const manifestSpec = new Specification<ComposerManifestHandler, Result>(
                        mName,
                        [manifestHandler]
    )

    const lockSpec = new Specification<ComposerLockHandler, Result>(
                        lName,
                        [lockHandler]
    )

    const packages = new Packages<Specification<ComposerManifestHandler, Result>,
                                  Specification<ComposerLockHandler, Result> >(
        'test-composer-package',
        manifestSpec,
        lockSpec
    )

    const res = await packages.get(false)
    expect(res.length).toEqual(10)

})


test('postive: test construction via factory with a known file without cleanup', async () => {
    const dir = sample_dir + "app/php/doctrine-instantiator/"
    const filesys = new Source(dir)
    let packages = ComposerParser('testr', 'test', filesys)

    expect(packages).toBeInstanceOf(Packages)
    // dont de-deup
    const res = await packages.get(false)
    expect(res.length).toEqual(10)
})


test('postive: test construction via factory with a known file with cleanup', async () => {
    const dir = sample_dir + "app/php/doctrine-instantiator/"
    const filesys = new Source(dir)
    let packages = ComposerParser('testr', 'test', filesys)

    expect(packages).toBeInstanceOf(Packages)
    const res = await packages.get()
    expect(res.length).toEqual(9)
})
