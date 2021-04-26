// the types allowed
// - when a selector finds a result, this enum determines how to process it
export enum PackageFileParsers {
    none = '',
    json_key_value_pair = 'JsonKeyValuePair'
}

export enum PackageFileTypes {
    none = '',
    manifest = 'manifest',
    lock = 'lock'
}
