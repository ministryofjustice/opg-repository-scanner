import { ManifestTypes } from "../enums"
import { PackageInfo } from "./PackageInfo"


export class GroupPackages {


    // group the package data passed in by the name property
    public static byName(packages:PackageInfo[]) : PackageInfo[] {
        let reduced:PackageInfo[] = []
        // get the unique package names
        const uniqueNames:string[] = [ ...new Set( packages.map(pkg => pkg.name) ) ]
        // loop over all names
        for (const name of uniqueNames) {
            let pkg = packages.find(i => i.name === name) ?? new PackageInfo()
            // loop over all packages
            for(const item of packages) {
                // it the name matches, but its not itself, expand
                if (item.name === name && item._id != pkg?._id) pkg.expand(item)
            }
            reduced.push(pkg)
        }
        /* eslint-disable no-console */
        // console.log("uniques:", uniqueNames)
        // console.log("reduced:", reduced)

        /* eslint-enable no-console */
        return reduced
    }
}
