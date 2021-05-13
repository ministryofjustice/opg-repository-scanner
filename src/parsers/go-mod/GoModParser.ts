import * as fs from 'fs';
import { IParser, ManifestTypes, PackageInfo } from "../../app";
import { GenericParser } from "../../app/classes/GenericParser";
import { GetPackages } from "../../app/classes/GetPackages";
import { IFilePatterns, ITags } from "../../app/interfaces";
import { GoLockPackages } from './classes/GoLockPackages';
import { GoManifestPackages } from './classes/GoManifestPackages';

export class GoModParser extends GenericParser implements IParser {

    static filePatterns:IFilePatterns = {
        manifest: ["**/go.mod"],
        lock: ["**/go.sum"]
    }

    static tags:ITags = {
        manifest: [ManifestTypes.Manifest, 'golang', 'gomod'],
        lock: [ManifestTypes.Lock, 'golang', 'gomod']
    }

    // Quick wrapper for calling GetPackages.files()
    async files(patterns:string[], type:ManifestTypes): Promise<string[]> {
        const getter:GetPackages = new GetPackages(
            this.repositoryName, this.directory, patterns, this.exclusions, type, this.followSymlinks
        )
        const files = await getter.files()
        return new Promise<string[]>( (resolve) => {
            resolve(files)
        })
    }

    //
    async locks(
        tags:string[],
        patterns:string[] = GoModParser.filePatterns.manifest
        ): Promise<PackageInfo[]> {

        let packages:PackageInfo[] = []
        const files = await this.files( GoModParser.filePatterns.lock, ManifestTypes.Lock)

        for(const file of files) {
            const content = fs.readFileSync(file, 'utf8')
            packages.push(
                ...GoLockPackages.get(content, this.repositoryName, file, tags)
            )
        }
        this._lockFiles = files
        this._locks = packages
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

    //
    async manifests(
        tags:string[],
        patterns:string[] = GoModParser.filePatterns.manifest
        ): Promise<PackageInfo[]> {

        let packages:PackageInfo[] = []
        const files = await this.files( GoModParser.filePatterns.manifest, ManifestTypes.Manifest)

        for(const file of files) {
            const content = fs.readFileSync(file, 'utf8')
            packages.push(
                ...GoManifestPackages.get(content, this.repositoryName, file, tags)
            )
        }
        this._manifests = packages
        this._manifestFiles = files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }


}
