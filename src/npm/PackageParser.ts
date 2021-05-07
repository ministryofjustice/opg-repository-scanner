import {Source} from '../config'
import {Packages, Specification, Result} from '../generics'
import {NpmLockHandler, NpmManifestHandler} from './classes'
import {NpmPatterns} from './patterns'
import {LockSelectorsArray, LockSelectorsRecursiveArray, ManifestSelectorsArray} from './selectors'

export function PackageParser(
    name = 'package',

    filesystem: Source,

    manifest_name = 'package-json',
    lock_name = 'package-lock',

    manifest_file_pattern?: string,
    lock_file_pattern?: string,

    manifest_selectors?: string[],
    lock_selectors?: string[],
    recursive_lock_selectors?: string[]
): Packages<Specification<NpmManifestHandler, Result>, Specification<NpmLockHandler, Result>> {
    if (typeof manifest_file_pattern === 'undefined') manifest_file_pattern = NpmPatterns.Manifest
    if (typeof lock_file_pattern === 'undefined') lock_file_pattern = NpmPatterns.Lock
    if (typeof manifest_selectors === 'undefined') manifest_selectors = ManifestSelectorsArray
    if (typeof lock_selectors === 'undefined') lock_selectors = LockSelectorsArray
    if (typeof recursive_lock_selectors === 'undefined')
        recursive_lock_selectors = LockSelectorsRecursiveArray

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
