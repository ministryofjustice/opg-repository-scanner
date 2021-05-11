import { PackageInfo } from "../classes";

// Main interface for each parser
export interface IParser {

    _manifests:PackageInfo[]
    _manifestFiles:string[]
    _locks:PackageInfo[]
    _lockFiles:string[]

    // setter instead of a constructor
    set(repositoryName:string,
        directory:string,
        exclusions:string[],
        followSymlinks:boolean): IParser

    locks(): Promise<PackageInfo[]>
    manifests(): Promise<PackageInfo[]>
    packages(): Promise<PackageInfo[]>
}
