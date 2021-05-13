import { ManifestTypes, PackageInfo } from "../../../app";
import { PackageType } from "../../../app/enums";


export class GoManifestPackages {


    static version(content:string) {
        return content
            .split('\n')
            // find the line that starts with "go ", which is the version line
            .filter(i => i.indexOf("go ") === 0)
            .map((line) => line.split(" "))
    }

    // -- need to test against tidy manifest files (they contains suffix data!)
    static get(
        content:string,
        repository:string,
        source:string,
        tags:string[]
        ): PackageInfo[] {

        let packages:PackageInfo[] = []
        // get the go version
        const [gName, gVersion] = GoManifestPackages.version(content).pop() ?? ['', '']
        // and push the go version into the set
        packages.push(
            new PackageInfo(repository, gName, gVersion, ManifestTypes.Manifest, source, tags)
        )
        // get all the packages from the require block
        const found = content
            .split('\n')
            // only lines with a " v" - which is on every module line
            .filter(i => i.includes(" v"))
            // remove the tab characters
            // remove spacing from the indirect comment generated from `go mod tidy`
            // split the line by " " so its [name, version, extras]
            .map((line) =>
                line
                    .replace('\t', '')
                    .replace('// indirect', '//indirect')
                    .split(" ")
            )

        // loop over all packages found
        for(const row of found){
            const [name, version, extras] = row
            let t = tags
            if(extras && extras.indexOf("indirect") ) t.push(PackageType.ThirdParty)

            packages.push(
                new PackageInfo(repository, name, version, ManifestTypes.Manifest, source, t)
            )
        }

        return packages
    }

}
