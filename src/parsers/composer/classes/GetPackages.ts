import * as fs from 'fs';
import { ManifestTypes } from '../../../app';

import { Files, JsonContent, PackageInfo } from "../../../app/classes";
import { IComposerLock, IComposerManifest } from '../interfaces';
import { PackageList } from './PackageList';

export class GetPackages{
    _files: string[] = []

    repositoryName:string = ''
    directory:string = ''
    filePatterns:string[] = []
    exclusions:string[] = []
    followSymlinks: boolean = false
    type:ManifestTypes = ManifestTypes.Null

    constructor(
        repositoryName:string,
        directory:string,
        filePatterns:string[],
        exclusions:string[],
        type:ManifestTypes,
        followSymlinks:boolean,
    ) {
        this.repositoryName = repositoryName
        this.directory = directory
        this.filePatterns = filePatterns
        this.followSymlinks = followSymlinks
        this.exclusions = exclusions
        this.type = type
    }

    // fetch all files that match the pattern
    async files(): Promise<string[]> {
        const file = new Files()
        const files = await file.get(
            this.directory,
            this.filePatterns,
            this.exclusions,
            this.followSymlinks)
        this._files = files
        return new Promise<string[]>( (resolve) => {
            resolve(files)
        })
    }

    // get uses generic T of either lock or manifest
    // to enable a more generic calling method for high level
    // as T is used to both parse the json object and then
    // to determine how to read that object into packages
    async get<T extends IComposerLock|IComposerManifest>(
        tags: string[],
        recursive:boolean
    ) : Promise<PackageInfo[]>  {
        let packages:PackageInfo[] = []
        const files = await this.files()
        // now loop over each file and get content
        for(const file of files){
            const content = fs.readFileSync(file, 'utf8')
            const parsed = JsonContent.as<T>(content)
            packages.push(
                ...PackageList.get<T>(
                    parsed,
                    this.repositoryName,
                    // replace the path we're executing from
                    file.replace( process.cwd(), '.') ,
                    this.type,
                    tags,
                    recursive
                )
            )
        }

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

}
