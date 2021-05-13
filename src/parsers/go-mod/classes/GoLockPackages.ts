import { ManifestTypes, PackageInfo } from "../../../app";
import { IPackageInfo } from "../../../app/interfaces/IPackages";


export class GoLockPackages {

    static get(
        content:string,
        repository:string,
        source:string,
        tags:string[]
        ): PackageInfo[] {

        let packages:PackageInfo[] = []

        // get all the packages
        const found = content
            .split('\n')
            // only lines with a " v" - which is on every module line
            .filter(i => i.includes(" v"))
            // split the line by " " so its [name, version/go.mod, extras]
            .map((line) => line.split(" ") )

        // loop over all packages found
        for(const row of found){
            const [name, version, extras] = row
            packages.push(
                new PackageInfo(repository, name, version.replace("/go.mod", ""), ManifestTypes.Manifest, source, tags)
            )
        }

        return packages
    }

}
