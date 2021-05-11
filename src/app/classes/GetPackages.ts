import * as fs from 'fs';
import { PackageList } from '../../parsers/composer/classes';
import { ManifestTypes } from '../enums';

import { IContent, IContentReader, IGetPackages,  } from '../interfaces';
import { Files } from './Files';
import { JsonContent } from './JsonContent';
import { PackageInfo } from './PackageInfo';


export class GetPackages implements IGetPackages{
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
    async get<T extends IContent>(
        tags: string[],
        recursive:boolean,
        reader:IContentReader
    ) : Promise<PackageInfo[]>  {

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve([])
        })
    }

}
