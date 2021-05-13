import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../../src/app';

import { JsonContent } from '../../../../src/app/classes'
import { IPackageLock, IPackageManifest } from '../../../../src/parsers/javascript-npm/interfaces';
import { PackageList } from '../../../../src/parsers/javascript-npm/classes';
const sample_dir: string = './__samples__/app/npm/'


test(`+ Test the get<t> matches Manifest correctly`, async () => {
    const file = sample_dir + 'valid/simple/package.json'
    const fileContent = fs.readFileSync(file, 'utf8')
    const manifest = JsonContent.as<IPackageManifest>(fileContent)

    let found = PackageList.get<IPackageManifest>(
        manifest,
        'test-repo',
        'source!',
        ManifestTypes.Manifest,
        ['test'],
        true
    )


    expect(found.length).toEqual(2)
    expect(found[0]).toBeInstanceOf(PackageInfo)

    const yaml = found.find(i => i.name === 'yaml')?.meta.pop()?.version ?? ''
    expect(yaml).toEqual("^1.10.2")

})


test(`+ Test the get<t> matches Lock correctly`, async () => {
    const file = sample_dir + 'valid/simple/package-lock.json'
    const fileContent = fs.readFileSync(file, 'utf8')
    const lock = JsonContent.as<IPackageLock>(fileContent)

    let found = PackageList.get<IPackageLock>(
        lock,
        'test-repo',
        'source!',
        ManifestTypes.Lock,
        ['test'],
        true
    )

    expect(found.length).toEqual(3)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})

test(`+ Test that empty package json with no packages returns empty without failing`, async () => {
    const file = sample_dir + 'valid/empty/package.json'
    const fileContent = fs.readFileSync(file, 'utf8')
    const m = JsonContent.as<IPackageManifest>(fileContent)

    let found = PackageList.get<IPackageManifest>(
        m,
        'test-repo',
        'source!',
        ManifestTypes.Manifest,
        ['test'],
        true
    )

    expect(found.length).toEqual(0)
    expect(found[0]).toBeUndefined()

})
