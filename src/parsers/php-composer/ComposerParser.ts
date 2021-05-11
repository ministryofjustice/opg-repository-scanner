import { IParser, ManifestTypes, PackageInfo } from "../../app";
import { GenericParser } from "../../app/classes/GenericParser";

import { ITags, IFilePatterns} from "../../app/interfaces";
import { GetPackages } from "./classes";
import { IComposerLock, IComposerManifest } from "./interfaces";



export class ComposerParser extends GenericParser implements IParser {

    static filePatterns:IFilePatterns = {
        manifest: ["**/composer.json"],
        lock: ["**/composer.lock"]
    }

    static tags:ITags = {
        manifest: [ManifestTypes.Manifest, 'php', 'composer'],
        lock: [ManifestTypes.Lock, 'php', 'composer']
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
        patterns:string[] = ComposerParser.filePatterns.lock
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
        patterns:string[] = ComposerParser.filePatterns.manifest
        ): Promise<PackageInfo[]> {
        const getter = this.getter(patterns, ManifestTypes.Manifest)
        const packages = await getter.get<IComposerManifest>(tags, true)
        this._manifests = packages
        this._manifestFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }


}
