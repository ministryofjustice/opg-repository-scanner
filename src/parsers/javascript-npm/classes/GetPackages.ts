import * as fs from 'fs';
import {IContent} from '../../../app/interfaces'
import { JsonContent, PackageInfo } from "../../../app/classes";
import { IPackageLock, IPackageManifest } from '../interfaces';
import { PackageList } from './PackageList';
import { GetPackages as BaseGetPackages } from '../../../app/classes/GetPackages';
import { IGetPackages } from '../../../app/interfaces/IGetPackages';

export class GetPackages extends BaseGetPackages implements IGetPackages{
    _files: string[] = []

    // get uses generic T of either lock or manifest
    // to enable a more generic calling method for high level
    // as T is used to both parse the json object and then
    // to determine how to read that object into packages
    async get<T extends IPackageManifest|IPackageLock>(
        tags: string[],
        recursive:boolean,
        reader:JsonContent = new JsonContent()
    ) : Promise<PackageInfo[]>  {



        let packages:PackageInfo[] = []
        const files = await this.files()
        // now loop over each file and get content
        for(const file of files){
            const content = fs.readFileSync(file, 'utf8')
            const parsed = reader.as<T>(content)

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
