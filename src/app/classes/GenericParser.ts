import { ManifestTypes } from "../enums"
import { IFilePatterns, IParser, ITags } from "../interfaces"
import { PackageInfo } from "./PackageInfo"


export class GenericParser implements IParser {

    _manifests:PackageInfo[] = []
    _manifestFiles:string[] = []
    _locks:PackageInfo[] = []
    _lockFiles:string[] = []

    repositoryName:string = ''
    directory:string = ''
    followSymlinks: boolean = false
    exclusions:string[] = []

    static filePatterns:IFilePatterns = {
        manifest: [""],
        lock: [""]
    }

    static tags:ITags = {
        manifest: [ManifestTypes.Manifest],
        lock: [ManifestTypes.Lock]
    }

    // Returned all the tags for composer
    tags():ITags{
        return Object.getPrototypeOf(this).constructor.tags
    }
    // Return the static patterns property for this instance
    patterns():IFilePatterns{
        return Object.getPrototypeOf(this).constructor.filePatterns
    }

    // use a set instead of a construct so can push to
    // the PARSERS global and then call a set after
    set(
        repositoryName:string,
        directory:string,
        exclusions:string[],
        followSymlinks:boolean,
    ) : IParser {
        this.repositoryName = repositoryName
        this.directory = directory
        this.followSymlinks = followSymlinks
        this.exclusions = exclusions
        return this
    }


    // process the lock files
    async locks( tags:string[], patterns:string[] ): Promise<PackageInfo[]> {
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve([])
        })
    }

    // process the manifest files
    async manifests(tags:string[], patterns:string[] ): Promise<PackageInfo[]> {
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve([])
        })
    }

    // get all packages, merging locks and manifest
    async packages(
        manifestTags: string[],
        lockTags: string[],
        manifestPatterns: string[],
        lockPatterns: string[]
    ): Promise<PackageInfo[]> {
        let packages: PackageInfo[] = []
        // merge in both manifests and lock files
        packages.push(
            ...await this.manifests(manifestTags, manifestPatterns),
            ...await this.locks(lockTags, lockPatterns)
        )

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }
}
