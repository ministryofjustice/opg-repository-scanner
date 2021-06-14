import * as fs from 'fs';
import { ManifestTypes } from '../../../app';

import { PackageInfo } from "../../../app/classes";
import { GetPackages as BaseGetPackages } from '../../../app/classes/GetPackages';
import { IContent, IContentReader, IGetPackages } from '../../../app/interfaces';

export class GetPackages extends BaseGetPackages implements IGetPackages{

    // Pip packages are split by newlines only
    async get<T extends IContent>(
        tags: string[],
        recursive:boolean,
        reader:IContentReader
    ) : Promise<PackageInfo[]>  {
        let packages:PackageInfo[] = []
        const files = await this.files()

        // now loop over each file and get content
        for(const file of files){
            const content = fs.readFileSync(file, 'utf8')
            const filePackages = content.split('\n')

            for(const line of filePackages){
                // ignore comments in the requirements file
                if(line.length > 0 && line[0] != "#" ) {
                    const split = line.split("==")
                    packages.push( new PackageInfo(
                        this.repositoryName,
                        split[0] ?? "",
                        split[1] ?? "",
                        ManifestTypes.Manifest,
                        file.replace( process.cwd(), '.') ,
                        tags,
                        ""
                    ) )
                }
            }
        }

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

}
