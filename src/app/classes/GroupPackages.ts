import { ManifestTypes } from "../enums"
import { IPackage } from "../interfaces"
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

        return reduced
    }


    // reduce packages to flat version
    public static toFlat(packages:PackageInfo[]): IPackage[] {
        let allFlat:IPackage[] = []
        for(const pkg of packages)  allFlat.push(...pkg.flat())
        return allFlat
    }


    public static byNameAndLocationWithCounts(packages:PackageInfo[]) : IPackage[] {
        let flat:IPackage[] = []
        const byName = GroupPackages.byName(packages)

        // expand out each grouped meta data
        for(const item of byName) {
            // map the sources to their value with a counter
            const sources = item.meta.reduce(
                (map, e) => map.set(e.source, (map.get(e.source) || 0) + 1),
                new Map()
            )
            // fetch unique versions of the other fields, remove emptys using filter, sort for neatness
            const versions = [...new Set( item.meta.map(i => i.version).filter(i => i) ) ]
            const types = [...new Set( item.meta.map(i => i.type).filter(i => i) ) ].sort()
            const licenses = [...new Set( item.meta.map(i => i.license).filter(i => i)  ) ].sort()
            // get all the unique tags
            const tags = [...new Set( item.meta.reduce(
                        (arr, i) => { arr.push(...i.tags); return arr },
                        new Array<string>()
                    ) ) ].sort()

            // generate a IPackage object from this item
            const pkg:IPackage = {
                repository: item.repository,
                name: item.name,
                version: (
                    (versions.length > 1 ) ? `${versions.shift()} (+${versions.length} others)` : `${versions.shift()}`
                ),
                type: types.join(', '),
                license: licenses.join(', '),
                tags: tags.join(', '),
                source: Array.from(sources, ([name, count]) => (`${name} (count: ${count})`) ).join('<br>')
            }

            flat.push(pkg)
        }

        return flat
    }
}
