import { PackageInfo } from "../classes";
import { IFilePatterns } from "./IFilePatterns";
import { ITags } from "./ITags";

// Main interface for each parser
export interface IParser {

    _manifests:PackageInfo[]
    _manifestFiles:string[]
    _locks:PackageInfo[]
    _lockFiles:string[]

    repositoryName:string
    directory:string
    followSymlinks: boolean
    exclusions:string[]


    tags(): ITags
    patterns(): IFilePatterns
    // setter instead of a constructor
    set(repositoryName:string,
        directory:string,
        exclusions:string[],
        followSymlinks:boolean): IParser

    locks(tags:string[], patterns:string[] ): Promise<PackageInfo[]>
    manifests(tags:string[], patterns:string[] ): Promise<PackageInfo[]>
    packages(
        manifestTags: string[],
        lockTags: string[],
        manifestPatterns: string[],
        lockPatterns: string[]): Promise<PackageInfo[]>

    // run calls packages function with all options pre-done
    run(): Promise<PackageInfo[]>
}
