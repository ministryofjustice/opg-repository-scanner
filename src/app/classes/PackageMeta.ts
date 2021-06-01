import { ManifestTypes } from "../enums"
import { IPackage, IPackageMeta } from "../interfaces"

// meta data for the packages
export class PackageMeta implements IPackageMeta{
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
        if(typeof source !== 'undefined') this.source = source.replace( process.cwd(), '.')
        if(typeof tags !== 'undefined') this.tags = tags
        if(typeof license !== 'undefined') this.license = license

    }


    flat(repository:string, name:string): IPackage {
        return {
            repository: repository,
            name: name,
            version: this.version,
            type: this.type,
            source: this.source,
            license: this.license,
            tags: this.tags.join(', ')
        }
    }

}
