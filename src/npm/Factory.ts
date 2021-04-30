import {Filesystem} from '../config'
import {Packages, Specification, Result} from '../generics'
import {NpmLockHandler, NpmManifestHandler} from './classes'
import {NpmPatterns} from './patterns'
import {LockSelectorsArray, LockSelectorsRecursiveArray, ManifestSelectorsArray} from './selectors'

export function PackageParser(
    name = 'package',

    filesystem: Filesystem,

    manifest_name = 'package-json',
    lock_name = 'package-lock',

    manifest_file_pattern: string = NpmPatterns.Manifest,
    lock_file_pattern: string = NpmPatterns.Lock,

    manifest_selectors: string[] = ManifestSelectorsArray,
    lock_selectors: string[] = LockSelectorsArray,

    recursive_lock_selectors: string[] = LockSelectorsRecursiveArray
): Packages<Specification<NpmManifestHandler, Result>, Specification<NpmLockHandler, Result>> {
    //-- Create the specification handlers
    const manifestHandler = new NpmManifestHandler(
        filesystem,
        manifest_file_pattern,
        manifest_selectors
    )
    const lockHandler = new NpmLockHandler(
        filesystem,
        lock_file_pattern,
        lock_selectors,
        recursive_lock_selectors
    )
    //-- Create the specs
    const manifestSpec = new Specification<NpmManifestHandler, Result>(manifest_name, [
        manifestHandler
    ])
    const lockSpec = new Specification<NpmLockHandler, Result>(lock_name, [lockHandler])
    //-- The main package
    return new Packages<
        Specification<NpmManifestHandler, Result>,
        Specification<NpmLockHandler, Result>
    >(name, manifestSpec, lockSpec)
}
