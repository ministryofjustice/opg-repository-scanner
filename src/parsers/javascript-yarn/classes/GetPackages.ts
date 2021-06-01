import * as fs from 'fs';
import { ManifestTypes } from '../../../app';

import { JsonContent, PackageInfo } from "../../../app/classes";
import { GetPackages as BaseGetPackages } from '../../../app/classes/GetPackages';
import { IContent, IContentReader, IGetPackages } from '../../../app/interfaces';

export class GetPackages extends BaseGetPackages implements IGetPackages{

    // Yarn packages are structured as
    //
    // package@version, package@version2:
    //      version: "version"
    //      otherField: "value"
    //
    // Use regex to find just the key and version
    async get<T extends IContent>(
        tags: string[],
        recursive:boolean,
        reader:IContentReader = new JsonContent()
    ) : Promise<PackageInfo[]>  {
        let packages:PackageInfo[] = []
        const files = await this.files()

        // now loop over each file and get content
        for(const file of files){
            const content = fs.readFileSync(file, 'utf8')
            // does a multlie line match on just the package key & version field
            const matches = content.match(/(.*):\n.*version "(.*)"/gm) ?? []

            for(const match of matches) {
                // split by new lines to seperate the declaration key and the version
                // field name
                const split = match.split('\n').filter(i => i)
                // just get the key, which is yarn can be , seperated
                const packageKeys = split
                                .filter(i => (i.indexOf('@') >= 0) )
                                .join()
                                // some packages start with @, so yarn escapes that
                                // with double quotes wrapping the name, so replace with
                                // html encoded
                                .replace(/"@/g, '"&#64;')
                                .split(",")
                // get the first name used on the declaration line
                const name = packageKeys
                                .map(i => i.split("@").shift()?.replace(/"/g, '').trim())
                                .shift()
                                // swap the @ back over to a real version
                                ?.replace('&#64;', '@')
                // get all the versions from the package declaration line
                // and trim off the double quotes from the @ symbol wrapping
                let versions = packageKeys
                                .map(i => i.split("@")
                                            .pop()?.replace(':', '')
                                            .replace(/"/g, '')
                                            .trim() )
                // get the version listed in the version field
                const version = split
                                .filter(i => (i.indexOf("version") >= 0) )
                                .map(i => i.replace("version", "")
                                                .replace(/"/g, "")
                                                .replace(/'/g, '')
                                                .trim()
                                ).shift()

                // push version into the versions list
                versions.push(version)
                // now create packageinfo for each one found
                for(const v of versions) {
                    packages.push(new PackageInfo(
                        this.repositoryName,
                        name,
                        v,
                        ManifestTypes.Lock,
                        file,
                        tags
                    ))
                }

            }

        }

        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }

}
