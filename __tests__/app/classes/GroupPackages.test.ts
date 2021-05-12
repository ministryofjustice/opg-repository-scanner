import { PackageInfo, GroupPackages, ManifestTypes } from "../../../src/app"
import { IPackage } from "../../../src/app/interfaces"


test(`+ Merge PackageInfo with sanem .name into a set.`, async () => {
    const packages:PackageInfo[] = [
        new PackageInfo('test-repo', 'php', '^7.2', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
        new PackageInfo('test-repo', 'php', '7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.3|7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.6', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),

        new PackageInfo('test-repo', 'laminas', '^3.0', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
    ]

    const byname = GroupPackages.byName(packages)
    expect(byname.length).toEqual(2)

    const php = byname.find(i => i.name === 'php')
    expect(php).toBeInstanceOf(PackageInfo)
    expect(php?.meta.length).toEqual(4)

})


test(`+ Converting PackageInfo[] to flat set of Package.`, async () => {
    const packages:PackageInfo[] = [
        new PackageInfo('test-repo', 'php', '^7.2', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
        new PackageInfo('test-repo', 'php', '7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.3|7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.6', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'laminas', '^3.0', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
    ]

    const flat = GroupPackages.toFlat(packages)
    expect(flat.length).toEqual(5)

    const manifest = flat.find(i => i.type === ManifestTypes.Manifest && i.name === 'php')
    expect(manifest?.tags).toEqual("php, manifest")

})



test(`+ Converting PackageInfo[] to group & counted data set.`, async () => {
    const packages:PackageInfo[] = [
        new PackageInfo('test-repo', 'php', '^7.2', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest', 'first']),
        new PackageInfo('test-repo', 'php', '7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.3|7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'laminas', '^3.0', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
    ]

    const byNameWithCounts = GroupPackages.byNameAndLocationWithCounts(packages)


    expect(byNameWithCounts.length).toEqual(2)
    const php = byNameWithCounts.find(i => i.name === 'php')
    expect(php?.version).toEqual('^7.2 (+2 others)')
    expect(php?.tags).toEqual('first, lock, manifest, php')

})
