import { ManifestTypes } from "../enums";
import { IPackageMeta } from "./IPackageMeta";

export interface IPackageInfo {
    repository:string
    name:string
    meta:IPackageMeta[]
}


export interface IPackage{
    repository:string
    name:string
    version:string
    type:ManifestTypes|string
    license:string
    source:string
    tags:string
}
