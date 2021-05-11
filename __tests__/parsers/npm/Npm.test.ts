import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../src/app';
import {Npm} from '../../../src/parsers/npm/Npm'

const sample_dir: string = './__samples__/app/npm/valid/'



test(`+ Test the tags function`, async () => {
    const comp = new Npm()
    const tags = comp.tags()
    const locks = Npm.tags.lock
    const manifest = Npm.tags.manifest
    expect(tags.lock).toEqual(locks)
    expect(tags.manifest).toEqual(manifest)
})


test(`+ Test the file patterns function`, async () => {
    const comp = new Npm()
    const patterns = comp.patterns()
    const locks = Npm.filePatterns.lock
    const manifest = Npm.filePatterns.manifest
    expect(patterns.lock).toEqual(locks)
    expect(patterns.manifest).toEqual(manifest)
})



test(`+ Test the locks function`, async () => {
    const dir = sample_dir + 'simple/'
    const comp = new Npm().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.locks(Npm.tags.lock, Npm.filePatterns.lock)

    expect(found.length).toEqual(3)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})


test(`+ Test the manifest function`, async () => {
    const dir = sample_dir + 'simple/'
    const comp = new Npm().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.manifests(Npm.tags.manifest, Npm.filePatterns.manifest)
    expect(found.length).toEqual(2)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})



test(`+ Test the packages function`, async () => {
    const dir = sample_dir + 'simple/'
    const comp = new Npm().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    // no de=dupping, so all packages will be in there
    const found = await comp.packages(
        Npm.tags.manifest, Npm.tags.lock, Npm.filePatterns.manifest, Npm.filePatterns.lock
    )
    expect(found.length).toEqual(5)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
