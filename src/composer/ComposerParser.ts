import {Source} from '../config'
import {Packages, Specification, Result} from '../generics'
import {ComposerLockHandler, ComposerManifestHandler} from './classes'
import {ComposerPatterns} from './patterns'
import {LockSelectorsArray, LockSelectorsRecursiveArray, ManifestSelectorsArray} from './selectors'

export function ComposerParser(
    repository = '',

    name = 'composer',

    filesystem: Source,

    manifest_name = 'composer-json',
    lock_name = 'composer-lock',

    manifest_file_pattern?: string,
    lock_file_pattern?: string,

    manifest_selectors?: string[],
    lock_selectors?: string[],

    recursive_lock_selectors?: string[]
): Packages<
    Specification<ComposerManifestHandler, Result>,
    Specification<ComposerLockHandler, Result>
> {
    if (typeof manifest_file_pattern === 'undefined')
        manifest_file_pattern = ComposerPatterns.Manifest
    if (typeof lock_file_pattern === 'undefined') lock_file_pattern = ComposerPatterns.Lock
    if (typeof manifest_selectors === 'undefined') manifest_selectors = ManifestSelectorsArray
    if (typeof lock_selectors === 'undefined') lock_selectors = LockSelectorsArray
    if (typeof recursive_lock_selectors === 'undefined')
        recursive_lock_selectors = LockSelectorsRecursiveArray

    //-- Create the specification handlers
    const manifestHandler = new ComposerManifestHandler(
        repository,
        filesystem,
        manifest_file_pattern,
        manifest_selectors
    )
    const lockHandler = new ComposerLockHandler(
        repository,
        filesystem,
        lock_file_pattern,
        lock_selectors,
        recursive_lock_selectors
    )
    //-- Create the specs
    const manifestSpec = new Specification<ComposerManifestHandler, Result>(manifest_name, [
        manifestHandler
    ])
    const lockSpec = new Specification<ComposerLockHandler, Result>(lock_name, [lockHandler])
    //-- The main package
    return new Packages<
        Specification<ComposerManifestHandler, Result>,
        Specification<ComposerLockHandler, Result>
    >(name, manifestSpec, lockSpec)
}
