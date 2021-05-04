import * as core from '@actions/core'

import {Filesystem} from '../config'
import {Packages, Specification, Result} from '../generics'
import {ComposerLockHandler, ComposerManifestHandler} from './classes'
import {ComposerPatterns} from './patterns'
import {LockSelectorsArray, LockSelectorsRecursiveArray, ManifestSelectorsArray} from './selectors'

export function ComposerParser(
    name = 'composer',

    filesystem: Filesystem,

    manifest_name = 'composer-json',
    lock_name = 'composer-lock',

    manifest_file_pattern: string = ComposerPatterns.Manifest,
    lock_file_pattern: string = ComposerPatterns.Lock,

    manifest_selectors: string[] = ManifestSelectorsArray,
    lock_selectors: string[] = LockSelectorsArray,

    recursive_lock_selectors: string[] = LockSelectorsRecursiveArray
): Packages<
    Specification<ComposerManifestHandler, Result>,
    Specification<ComposerLockHandler, Result>
> {
    core.debug(`[ComposerParser] name: ${name}`)

    //-- Create the specification handlers
    const manifestHandler = new ComposerManifestHandler(
        filesystem,
        manifest_file_pattern,
        manifest_selectors
    )
    const lockHandler = new ComposerLockHandler(
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
