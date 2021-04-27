import {ComposerParser} from './classes'

export {Parser} from './interfaces'
export {
    ComposerLock,
    ComposerLockSpec,
    ComposerManifest,
    ComposerManifestSpec,
    ComposerParser
} from './classes'

export const Parsers = new Map([['ComposerParser', ComposerParser]])
