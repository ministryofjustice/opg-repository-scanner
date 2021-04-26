import { Result } from './Result'
import { ComposerManifest } from './ComposerManifest';
import { ComposerLock } from './ComposerLock';

export { ComposerManifest } from './ComposerManifest';
export { ComposerLock } from './ComposerLock';

// export a string indexable set of the classes
export const Parsers = {
    'ComposerManifest' : ComposerManifest,
    'ComposerLock' : ComposerLock
}
