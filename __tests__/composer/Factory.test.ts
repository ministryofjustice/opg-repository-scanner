import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {SpecificationHandler,
        Specification,
        Result,
        Packages
} from "../../src/generics"
import {
    ComposerSpecificationHandler,

    ManifestSelectors,
    LockSelectors,
    LockSelectorsRecursive,

    composerLock,
    composerManifest
} from "../../src/composer"
import { Filesystem } from '../../src/config'
import { ComposerParser } from '../../src/composer/Factory'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'


test('postive: test construction raw and reporting with a known & small file', async () => {
    const filesys = new Filesystem(sample_dir)
    // custom locations for the test using known packages (and small numbers)
    const mFile:string = "app/php/doctrine-instantiator/composer.json"
    const mName:string = 'composer-manifest-spec'
    const lFile:string = "app/php/doctrine-instantiator/composer.lock"
    const lName:string = 'composer-lock-spec'

    // handlers to load a file
    const manifestHandler = new ComposerSpecificationHandler(
        filesys,
        mFile,
        [ ManifestSelectors.Main] ,
        composerManifest
    )
    const recursive = [
        LockSelectorsRecursive.PackageRequire,
        LockSelectorsRecursive.PackageRequireDev,
        LockSelectorsRecursive.PackageDevRequire,
        LockSelectorsRecursive.PackageDevRequireDev
    ]
    const lockHandler = new ComposerSpecificationHandler(
        filesys,
        lFile,
        [ LockSelectors.Main ],
        composerLock,
        recursive
    )

    const manifestSpec = new Specification<ComposerSpecificationHandler, Result>(
                        mName,
                        [manifestHandler]
    )

    const lockSpec = new Specification<ComposerSpecificationHandler, Result>(
                        lName,
                        [lockHandler]
    )

    const packages = new Packages<Specification<ComposerSpecificationHandler, Result>,
                                  Specification<ComposerSpecificationHandler, Result> >(
        'test-composer-package',
        manifestSpec,
        lockSpec
    )

    const res = await packages.get()
    expect(res.length).toEqual(10)


})


test('postive: test construction via factory with a known file', async () => {
    const dir = sample_dir + "app/php/doctrine-instantiator/"
    const filesys = new Filesystem(dir)
    const packages = ComposerParser(filesys)

    const res = await packages.get()

    expect(packages).toBeInstanceOf(Packages)
    expect(res.length).toEqual(10)

})
