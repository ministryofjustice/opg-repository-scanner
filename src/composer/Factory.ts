import {Filesystem} from '../config'
import {Packages, Specification, Result} from '../generics'
import {ComposerSpecificationHandler} from './classes'
import {composerLock, composerManifest} from './parsers'
import {ComposerPatterns} from './patterns'
import {LockSelectorsArray, LockSelectorsRecursiveArray, ManifestSelectorsArray} from './selectors'

export function ComposerParser(
    filesystem: Filesystem,

    manifest_name = 'composer-json',
    lock_name = 'composer-lock',

    manifest_file_pattern: string = ComposerPatterns.Manifest,
    lock_file_pattern: string = ComposerPatterns.Lock,

    manifest_selectors: string[] = ManifestSelectorsArray,
    lock_selectors: string[] = LockSelectorsArray,

    recursive_lock_selectors: string[] = LockSelectorsRecursiveArray
): Packages<
    Specification<ComposerSpecificationHandler, Result>,
    Specification<ComposerSpecificationHandler, Result>
> {
    //-- Create the specification handlers
    const manifestHandler = new ComposerSpecificationHandler(
        filesystem,
        manifest_file_pattern,
        manifest_selectors,
        composerManifest
    )
    const lockHandler = new ComposerSpecificationHandler(
        filesystem,
        lock_file_pattern,
        lock_selectors,
        composerLock,
        recursive_lock_selectors
    )
    //-- Create the specs
    const manifestSpec = new Specification<ComposerSpecificationHandler, Result>(manifest_name, [
        manifestHandler
    ])
    const lockSpec = new Specification<ComposerSpecificationHandler, Result>(lock_name, [
        lockHandler
    ])
    //-- The main package
    return new Packages<
        Specification<ComposerSpecificationHandler, Result>,
        Specification<ComposerSpecificationHandler, Result>
    >('composer', manifestSpec, lockSpec)
}
