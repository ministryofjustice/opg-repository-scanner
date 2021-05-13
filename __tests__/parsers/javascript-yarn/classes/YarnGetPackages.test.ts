import * as fs from 'fs';
import { ManifestTypes } from '../../../../src/app';
import { JsonContent, PackageInfo, PackageMeta } from '../../../../src/app/classes';
import { GetPackages } from "../../../../src/parsers/javascript-yarn/classes/GetPackages"
import { YarnParser } from "../../../../src/parsers/javascript-yarn/YarnParser"

const sample_dir: string = './__samples__/app/yarn/valid/'

test(`+ Test the file function finds yarn files correctly`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir + 'sample/',
        YarnParser.filePatterns.lock,
        ["(vendor/*)"],
        ManifestTypes.Lock,
        false
    )

    const files = await get.files()
    expect(files.length).toEqual(1)
})



test(`+ Test package finding is working on sample file`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir + 'sample/',
        YarnParser.filePatterns.lock,
        ["(vendor/*)"],
        ManifestTypes.Lock,
        false
    )

    const pkgs = await get.get( ['test'], true )
    // based on the simple sample yarn lock, we should have...
    const p1 = pkgs.filter(i => i.name === 'package-1')
    // the key declaration and then the version field
    expect(p1.length).toEqual(2)
    const p4 = pkgs.filter(i => i.name === 'package-4')
    // package 4 has two packages in the declaration key line and a version field
    expect(p4.length).toEqual(3)

})


test(`+ Test package with @ in the name is found correctly`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir + 'sample/',
        YarnParser.filePatterns.lock,
        ["(vendor/*)"],
        ManifestTypes.Lock,
        false
    )

    const pkgs = await get.get( ['test'], true )
    const pk1 = pkgs.filter(i => (i.name.indexOf('@types/pk1') >= 0) )
    // has two versions in the declaration
    expect(pk1.length).toEqual(3)
    expect(pk1[0]).toBeInstanceOf(PackageInfo)

})


test(`+ Test large files are all parsed correctly`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir + 'large/',
        YarnParser.filePatterns.lock,
        ["(vendor/*)"],
        ManifestTypes.Lock,
        false
    )

    const pkgs = await get.get( ['test'], true )
    expect(pkgs.length).toBeGreaterThan(100)
    // check every package
    for(const pkg of pkgs) {
        expect(pkg).toBeInstanceOf(PackageInfo)
        // no merging / de-dup at the moment, so this should be 1
        expect(pkg.meta.length).toBe(1)
        expect(pkg.meta[0]).toBeInstanceOf(PackageMeta)
        expect(pkg.meta[0].tags.length).toEqual(1)
        expect(pkg.meta[0].tags[0]).toEqual('test')
    }


})
