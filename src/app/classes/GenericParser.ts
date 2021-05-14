import * as core from '@actions/core'
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

    // Returned all the tags
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
        core.debug(`[${this.constructor.name}] packages finished`)
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

    // run calls packages and outputs some details
    // about what was found for ease
    async run(): Promise<PackageInfo[]> {
        const parserName = this.constructor.name
        core.debug(`[${parserName}] Running`)

        /* eslint-disable no-console */
        if(core.isDebug()) console.log('Parser object: ', this)
        /* eslint-enable no-console */
        const tags = this.tags()
        const patterns = this.patterns()
        const found = await this.packages(
            tags.manifest,
            tags.lock,
            patterns.manifest,
            patterns.lock
        )

        core.info(
            `[${parserName}] Found [${found.length}] packages.\n` +
            `   [${this._manifests.length}] manifest packages from [${this._manifestFiles.length}] files.\n` +
            `   [${this._locks.length}] lock packages from [${this._lockFiles.length}] files.\n`
        )

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(found)
        })
    }
}
