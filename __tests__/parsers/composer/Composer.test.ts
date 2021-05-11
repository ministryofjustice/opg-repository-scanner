import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../src/app';
import {ComposerParser as Composer} from '../../../src/parsers/php-composer/ComposerParser'

const sample_dir: string = './__samples__/app/php/valid/'


test(`+ Test the tags function`, async () => {
    const comp = new Composer()
    const tags = comp.tags()
    const locks = Composer.tags.lock
    const manifest = Composer.tags.manifest
    expect(tags.lock).toEqual(locks)
    expect(tags.manifest).toEqual(manifest)
})


test(`+ Test the file patterns function`, async () => {
    const comp = new Composer()
    const patterns = comp.patterns()
    const locks = Composer.filePatterns.lock
    const manifest = Composer.filePatterns.manifest
    expect(patterns.lock).toEqual(locks)
    expect(patterns.manifest).toEqual(manifest)
})



test(`+ Test the locks function`, async () => {
    const dir = sample_dir + 'doctrine-instantiator/'
    const comp = new Composer().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.locks(Composer.tags.lock, Composer.filePatterns.lock)

    expect(found.length).toEqual(9)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})


test(`+ Test the manifest function`, async () => {
    const dir = sample_dir + 'doctrine-instantiator/'
    const comp = new Composer().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.manifests(Composer.tags.manifest, Composer.filePatterns.manifest)
    expect(found.length).toEqual(1)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})



test(`+ Test the packages function`, async () => {
    const dir = sample_dir + 'doctrine-instantiator/'
    const comp = new Composer().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    // no de=dupping, so all packages will be in there
    const found = await comp.packages(
        Composer.tags.lock, Composer.tags.manifest, Composer.filePatterns.manifest, Composer.filePatterns.lock
    )
    expect(found.length).toEqual(10)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
