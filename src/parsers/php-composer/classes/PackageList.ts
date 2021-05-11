import * as core from '@actions/core'

import { PackageInfo } from "../../../app/classes/PackageInfo";
import { ManifestTypes } from "../../../app/enums";
import { IJsonContent } from "../../../app/interfaces";
import { IComposerLock, IComposerManifest } from "../interfaces";

export class PackageList {

    // get<T> wraps around manifest & get by using generic and
    // type data based to determine which version to call
    // - useful for calling in higher level areas
    public static get<T extends IComposerManifest|IComposerLock>(
        object:T,
        repository:string,
        source:string,
        type:ManifestTypes,
        tags:string[] = [],
        recursive:boolean = false
        ): PackageInfo[] {

        core.info(`PackageList getting [${type}] data from [${source}].`)
        if(type === ManifestTypes.Lock) {
            return PackageList.lock(
                object as IComposerLock,
                repository,
                source,
                type,
                tags,
                recursive
            )
        } else if (type === ManifestTypes.Manifest) {
            return PackageList.manifest(
                object as IComposerManifest,
                repository,
                source,
                type,
                tags
            )
        }

        return []
    }


    // manifest uses the raw manifest interface objects
    // to generate an array of all packages
    // - no de-duplication in this step
    public static manifest(
        manifest:IComposerManifest,
        repository:string,
        source:string,
        type:ManifestTypes,
        tags:string[] = [],

        ): PackageInfo[] {

        let packages: PackageInfo[] = []

        // merge the require & require dev together
        const requires = [
                ...Object.entries(manifest.require),
                ...Object.entries(manifest["require-dev"] ?? {} )
        ]

        for(const [key, version] of requires) {
            packages.push( new PackageInfo(
                repository,
                key,
                version,
                type,
                source,
                tags
            ))
        }
        return packages
    }

    // lock uses the raw lock interface objects
    // to generate an array of all packages and
    // gones recursively down to the sub level
    // - no de-duplication in this step
    public static lock(
        lock:IComposerLock,
        repository:string,
        source:string,
        type:ManifestTypes,
        tags:string[] = [],
        recursive:boolean = false
        ): PackageInfo[] {

        let packages: PackageInfo[] = []

        const topLevel = [
            ...lock.packages,
            ...(lock["packages-dev"] ?? [] )
        ]

        for(const item of topLevel) {
            packages.push( new PackageInfo(
                repository,
                item.name,
                item.version,
                type,
                source,
                tags
            ))

            if(recursive) {
                // use the manifest parser on this item, but set the type to be lock and tags to match
                packages.push(...PackageList.manifest(item, repository, source, ManifestTypes.Lock, tags) )
            }

        }

        return packages
    }




}
