import * as core from '@actions/core'

import { PackageInfo } from "../../../app/classes/PackageInfo";
import { ManifestTypes } from "../../../app/enums";
import { IPackageLock, IPackageManifest, IPackageLockDep, IPackageDependancy, IPackageLockDependancy } from "../interfaces";

export class PackageList {


    public static get<T extends IPackageLock|IPackageManifest>(
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
                object as IPackageLock,
                repository,
                source,
                type,
                tags,
                recursive
            )
        } else if (type === ManifestTypes.Manifest) {
            return PackageList.manifest(
                object as IPackageManifest,
                repository,
                source,
                type,
                tags
            )
        }

        return []
    }

    public static manifest(
        manifest:IPackageManifest,
        repository:string,
        source:string,
        type:ManifestTypes,
        tags:string[] = [],

        ): PackageInfo[] {

        let packages: PackageInfo[] = []

        // merge the require & require dev together
        const requires = [
                ...Object.entries(manifest.dependencies ?? {} ),
                ...Object.entries(manifest.devDependencies ?? {} )
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


    public static lock(
        lock:IPackageLock,
        repository:string,
        source:string,
        type:ManifestTypes,
        tags:string[] = [],
        recursive:boolean = false
        ): PackageInfo[] {

        let packages: PackageInfo[] = []

        const topLevel = lock.dependencies ?? []


        for(let [name, item] of Object.entries(topLevel)) {
            let version = Object.entries(item).find(e => e[0] === 'version')?.pop() as string

            packages.push( new PackageInfo(
                repository,
                name,
                version,
                type,
                source,
                tags
            ))

        }

        return packages
    }




}
