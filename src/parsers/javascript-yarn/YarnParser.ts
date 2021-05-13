import { IParser, ManifestTypes, PackageInfo } from "../../app";
import { JsonContent } from "../../app/classes";
import { GenericParser } from "../../app/classes/GenericParser";
import { IContent, IFilePatterns, ITags } from "../../app/interfaces";
import { GetPackages } from "./classes/GetPackages";

export class YarnParser extends GenericParser implements IParser {

    static filePatterns:IFilePatterns = {
        manifest: [],
        lock: ['**/yarn.lock']
    }

    static tags:ITags = {
        manifest: [ManifestTypes.Manifest, 'javascript', 'yarn'],
        lock: [ManifestTypes.Lock, 'javascript', 'yarn']
    }

    // get just the locks
    async locks(
        tags:string[],
        patterns:string[] = YarnParser.filePatterns.manifest
        ): Promise<PackageInfo[]> {

        const getter = new GetPackages(
            this.repositoryName, this.directory, patterns,
            this.exclusions, ManifestTypes.Lock, this.followSymlinks
        )
        // will pass in JsonContent even though we dont use it
        const packages = await getter.get<IContent>(tags, true )
        this._locks = packages
        this._lockFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }


}
