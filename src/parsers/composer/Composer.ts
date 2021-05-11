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
        manifest: ['manifest', 'php'],
        lock: ['lock', 'php']
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
    private getter(patterns:string[], type:ManifestTypes): GetPackages {
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
    async locks(): Promise<PackageInfo[]> {
        const getter = this.getter(Composer.filePatterns.lock, ManifestTypes.Lock)
        const packages = await getter.get<IComposerLock>([], true)
        this._locks = packages
        this._lockFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

    // process the manifest files
    async manifests(): Promise<PackageInfo[]> {
        const getter = this.getter(Composer.filePatterns.manifest, ManifestTypes.Manifest)
        const packages = await getter.get<IComposerManifest>([], true)
        this._manifests = packages
        this._manifestFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

    // get all packages, merging locks and manifest
    async packages(): Promise<PackageInfo[]> {
        let packages: PackageInfo[] = []
        // merge in both manifests and lock files
        packages.push(
            ...await this.manifests(),
            ...await this.locks()
        )

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

}
