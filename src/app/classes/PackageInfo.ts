import { PackageMeta } from "./PackageMeta"
import { ManifestTypes } from "../enums"
import { v4 as uuid } from 'uuid';
import { IPackage } from "../interfaces";


// PackageInfo is the base package data we're trying to construct
// from each parser type
export class PackageInfo {
    _id: string = '';
    repository:string = ''
    name:string = ''
    meta:PackageMeta[] = []


    constructor(
        repository?: string,
        name?:string,
        version?:string,
        type?:ManifestTypes,
        source?:string,
        tags?:string[],
        license?:string
    ) {
        this._id = uuid()
        if(typeof repository !== 'undefined') this.repository = repository
        if(typeof name !== 'undefined') this.name = name

        this.meta.push(new PackageMeta(version, type, source, tags, license))

    }

    // merging meta from other packages that have been found
    expand(other:PackageInfo): void {
        this.meta.push(...other.meta)
    }

    // convert this to flat array of packages
    flat(): IPackage[] {
        const flatMeta = this.meta.map((meta) => meta.flat(this.repository, this.name) )
        return flatMeta
    }

}
