import { ManifestTypes } from "../enums";

export interface IPackageMeta{
    version:string
    type:ManifestTypes
    license:string
    source:string
    tags:string[]
}
