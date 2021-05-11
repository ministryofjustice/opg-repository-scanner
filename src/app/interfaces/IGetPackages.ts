import { PackageInfo } from "../classes";
import { ManifestTypes } from "../enums";
import { IContent } from "./IContent";
import { IContentReader } from "./IContentReader";

// Main interface for each parser
export interface IGetPackages {

    repositoryName:string
    directory:string
    filePatterns:string[]
    exclusions:string[]
    followSymlinks: boolean
    type:ManifestTypes

    files(): Promise<string[]>
    get<T extends IContent>(
        tags: string[],
        recursive:boolean,
        reader:IContentReader
    ): Promise<PackageInfo[]>
}
