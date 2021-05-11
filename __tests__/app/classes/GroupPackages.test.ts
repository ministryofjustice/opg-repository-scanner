import { PackageInfo, GroupPackages, ManifestTypes } from "../../../src/app"



test(`+ Merge PackageInfo with sanem .name into a set.`, async () => {
    const packages:PackageInfo[] = [
        new PackageInfo('test-repo', 'php', '^7.2', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
        new PackageInfo('test-repo', 'php', '7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.3|7.5', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),
        new PackageInfo('test-repo', 'php', '7.6', ManifestTypes.Lock, 'test-lock', ['php', 'lock']),

        new PackageInfo('test-repo', 'laminas', '^3.0', ManifestTypes.Manifest, 'test-manifest', ['php', 'manifest']),
    ]


    GroupPackages.byName(packages)


})
