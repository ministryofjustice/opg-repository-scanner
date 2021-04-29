import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {SpecificationHandler,
        Specification,
        Result,
        Packages
} from "../../../src/generics"
import { ManifestSelectors, LockSelectors, LockSelectorsRecursive } from "../../../src/composer/selectors"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'


test('postive: test construction forms a valid package when creating directly', async () => {
    const filesys = new Filesystem(sample_dir)
    // custom locations for the test
    const mFile:string = "app/php/laminas/composer.json"
    const mName:string = 'manifest-spec'
    const lFile:string = "app/php/laminas/composer.lock"
    const lName:string = 'lock-spec'
    // test function that always returns same result
    const tester = function(): Result[]{
        return [new Result('test')]
    }
    // handlers to load a file
    const manifestHandler = new SpecificationHandler(
        filesys,
        mFile,
        ManifestSelectors.Main
    )
    const lockHandler = new SpecificationHandler(
        filesys,
        lFile,
        LockSelectors.Main
    )

    const manifestSpec = new Specification<SpecificationHandler, Result>(
                        mName,
                        [manifestHandler]
    )

    const lockSpec = new Specification<SpecificationHandler, Result>(
                        lName,
                        [manifestHandler]
    )

    const packages = new Packages<Specification<SpecificationHandler, Result>,
                                  Specification<SpecificationHandler, Result> >(
        'test-package',
        manifestSpec,
        lockSpec
    )

    expect(packages.name).toEqual('test-package')

    expect(packages.manifest).toBeInstanceOf(Specification)
    expect(packages.manifest.name).toEqual(mName)

    expect(packages.lock).toBeInstanceOf(Specification)
    expect(packages.lock?.name).toEqual(lName)

})
