import * as core from '@actions/core'
import {Source} from '../config'
import {Packages, Specification, Result} from '../generics'
import {PipLockHandler, PipManifestHandler} from './classes'
import {PipPatterns} from './patterns'
import {LockSelectorsArray, LockSelectorsRecursiveArray, ManifestSelectorsArray} from './selectors'

export function PipParser(
    name = 'pip',

    filesystem: Source,

    manifest_name = 'pip',
    lock_name = 'pip-lock',

    manifest_file_pattern?: string,
    lock_file_pattern?: string,
    // these are ignored, but kept for consistnecy
    manifest_selectors?: string[],
    lock_selectors?: string[],
    recursive_lock_selectors?: string[]
): Packages<Specification<PipManifestHandler, Result>, Specification<PipLockHandler, Result>> {
    if (typeof manifest_file_pattern === 'undefined') manifest_file_pattern = PipPatterns.Manifest
    if (typeof lock_file_pattern === 'undefined') lock_file_pattern = PipPatterns.Lock
    if (typeof manifest_selectors === 'undefined') manifest_selectors = ManifestSelectorsArray
    if (typeof lock_selectors === 'undefined') lock_selectors = LockSelectorsArray
    if (typeof recursive_lock_selectors === 'undefined')
        recursive_lock_selectors = LockSelectorsRecursiveArray
    //-- Create the specification handlers
    const manifestHandler = new PipManifestHandler(filesystem, manifest_file_pattern)
    const lockHandler = new PipLockHandler(filesystem, lock_file_pattern)
    //-- Create the specs
    const manifestSpec = new Specification<PipManifestHandler, Result>(manifest_name, [
        manifestHandler
    ])
    const lockSpec = new Specification<PipLockHandler, Result>(lock_name, [lockHandler])

    core.debug(`[PipParser] manifest_selectors length should be 0 - ${manifest_selectors.length}`)
    core.debug(`[PipParser] lock_selectors length should be 0 - ${lock_selectors.length}`)
    core.debug(
        `[PipParser] recursive_lock_selectors length should be 0 - ${recursive_lock_selectors.length}`
    )

    //-- The main package
    return new Packages<
        Specification<PipManifestHandler, Result>,
        Specification<PipLockHandler, Result>
    >(name, manifestSpec, lockSpec)
}
