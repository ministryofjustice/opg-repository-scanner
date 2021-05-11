import { IParser, ManifestTypes, PackageInfo } from "../../app";
import { JsonContent } from "../../app/classes";
import { GenericParser } from "../../app/classes/GenericParser";
import { IContent, IFilePatterns, ITags } from "../../app/interfaces";
import { GetPackages } from "./classes/GetPackages";

export class PipParser extends GenericParser implements IParser {

    static filePatterns:IFilePatterns = {
        manifest: ["**/requirements.txt"],
        lock: []
    }

    static tags:ITags = {
        manifest: [ManifestTypes.Manifest, 'python', 'pip'],
        lock: [ManifestTypes.Lock, 'python', 'pip']
    }


    async manifests(
        tags:string[],
        patterns:string[] = PipParser.filePatterns.manifest
        ): Promise<PackageInfo[]> {

        const getter = new GetPackages(
            this.repositoryName, this.directory, patterns,
            this.exclusions, ManifestTypes.Manifest, this.followSymlinks
        )
        // will pass in JsonContent even though we dont use it
        const packages = await getter.get<IContent>(tags, true, new JsonContent() )
        this._manifests = packages
        this._manifestFiles = getter._files
        return new Promise<PackageInfo[]>( (resolve) => {
            resolve(packages)
        })
    }


}
