// the types allowed
// - when a selector finds a result, this enum determines how to process it
export enum PackageFileParsers {
    none = '',
    ComposerManifest = 'ComposerManifest',
    ComposerLock = 'ComposerLock'
}

export enum PackageFileTypes {
    none = '',
    manifest = 'manifest',
    lock = 'lock'
}
