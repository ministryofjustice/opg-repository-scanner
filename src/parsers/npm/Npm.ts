import { IParser, ManifestTypes, PackageInfo } from "../../app";

import { ITags, IFilePatterns} from "../../app/interfaces";
import { Composer } from "../composer";
import { GetPackages } from "./classes";
import { IPackageLock, IPackageManifest } from "./interfaces";



export class Npm extends Composer implements IParser {

    static filePatterns:IFilePatterns = {
        manifest: ["**/package.json"],
        lock: ["**/package-lock.json"]
    }

    static tags:ITags = {
        manifest: ['manifest', 'javascript'],
        lock: ['lock', 'javascript']
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
        patterns:string[] = Npm.filePatterns.lock
        ):  Promise<PackageInfo[]> {
        const getter = this.getter(patterns, ManifestTypes.Lock)
        const packages = await getter.get<IPackageLock>(tags, true)
        this._locks = packages
        this._lockFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

    // process the manifest files
    async manifests(
        tags:string[],
        patterns:string[] = Npm.filePatterns.manifest
        ): Promise<PackageInfo[]> {
        const getter = this.getter(patterns, ManifestTypes.Manifest)
        const packages = await getter.get<IPackageManifest>(tags, true)
        this._manifests = packages
        this._manifestFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }


}
