import { IParser, ManifestTypes, PackageInfo } from "../../app";

import { ITags, IFilePatterns} from "../../app/interfaces";
import { GetPackages } from "./classes";
import { IComposerLock, IComposerManifest } from "./interfaces";



export class Composer implements IParser {
    _manifests:PackageInfo[] = []
    _manifestFiles:string[] = []
    _locks:PackageInfo[] = []
    _lockFiles:string[] = []


    repositoryName:string = ''
    directory:string = ''
    followSymlinks: boolean = false
    exclusions:string[] = []


    static filePatterns:IFilePatterns = {
        manifest: ["**/composer.json"],
        lock: ["**/composer.lock"]
    }

    static tags:ITags = {
        manifest: [ManifestTypes.Manifest, 'php'],
        lock: [ManifestTypes.Lock, 'php']
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

    // helper method to return a GetPackages object
    protected getter(patterns:string[], type:ManifestTypes): GetPackages {
        return new GetPackages(
            this.repositoryName,
            this.directory,
            patterns,
            this.exclusions,
            type,
            this.followSymlinks
        )
    }

    // process the lock files
    async locks(
        tags:string[],
        patterns:string[] = Composer.filePatterns.lock
        ): Promise<PackageInfo[]> {
        const getter = this.getter(patterns, ManifestTypes.Lock)
        const packages = await getter.get<IComposerLock>(tags, true)
        this._locks = packages
        this._lockFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

    // process the manifest files
    async manifests(
        tags:string[],
        patterns:string[] = Composer.filePatterns.manifest
        ): Promise<PackageInfo[]> {
        const getter = this.getter(patterns, ManifestTypes.Manifest)
        const packages = await getter.get<IComposerManifest>(tags, true)
        this._manifests = packages
        this._manifestFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
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
