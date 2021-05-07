import * as core from '@actions/core'
import {Source} from '../config'
import {Packages, Specification, Result} from '../generics'
import {PipLockHandler, PipManifestHandler} from './classes'
import {PipPatterns} from './patterns'

export function PipParser(
    name = 'pip',

    filesystem: Source,

    manifest_name = 'pip',
    lock_name = 'pip-lock',

    manifest_file_pattern: string = PipPatterns.Manifest,
    lock_file_pattern: string = PipPatterns.Lock,
    // these are ignored, but kept for consistnecy
    manifest_selectors: string[] = [],
    lock_selectors: string[] = [],
    recursive_lock_selectors: string[] = []
): Packages<Specification<PipManifestHandler, Result>, Specification<PipLockHandler, Result>> {
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
