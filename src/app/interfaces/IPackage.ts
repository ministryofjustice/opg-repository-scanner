import { ManifestTypes } from "../enums";

export interface IPackage{
    repository:string
    name:string
    version:string
    type:ManifestTypes
    license:string
    source:string
    tags:string
}
