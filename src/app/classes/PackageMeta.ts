import { ManifestTypes } from "../enums"

// meta data for the packages
export class PackageMeta {
    version:string = ''
    type:ManifestTypes = ManifestTypes.Null
    license:string = ''
    source:string = ''
    tags:string[] = []

    constructor(
        version?:string,
        type?:ManifestTypes,
        source?:string,
        tags?:string[],
        license?:string
    ) {
        if(typeof version !== 'undefined') this.version = version
        if(typeof type !== 'undefined') this.type = type
        if(typeof source !== 'undefined') this.source = source
        if(typeof tags !== 'undefined') this.tags = tags
        if(typeof license !== 'undefined') this.license = license

    }

}
