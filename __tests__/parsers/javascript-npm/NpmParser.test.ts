import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../src/app';
import {NpmParser} from '../../../src/parsers/javascript-npm/NpmParser'

const sample_dir: string = './__samples__/app/npm/valid/'



test(`+ Test the tags function`, async () => {
    const parser = new NpmParser()
    const tags = parser.tags()
    const locks = NpmParser.tags.lock
    const manifest = NpmParser.tags.manifest
    expect(tags.lock).toEqual(locks)
    expect(tags.manifest).toEqual(manifest)
})


test(`+ Test the file patterns function`, async () => {
    const parser = new NpmParser()
    const patterns = parser.patterns()
    const locks = NpmParser.filePatterns.lock
    const manifest = NpmParser.filePatterns.manifest
    expect(patterns.lock).toEqual(locks)
    expect(patterns.manifest).toEqual(manifest)
})



test(`+ Test the locks function`, async () => {
    const dir = sample_dir + 'simple/'
    const parser = new NpmParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await parser.locks(NpmParser.tags.lock, NpmParser.filePatterns.lock)

    expect(found.length).toEqual(3)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})


test(`+ Test the manifest function`, async () => {
    const dir = sample_dir + 'simple/'
    const parser = new NpmParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await parser.manifests(NpmParser.tags.manifest, NpmParser.filePatterns.manifest)
    expect(found.length).toEqual(2)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})



test(`+ Test the packages function`, async () => {
    const dir = sample_dir + 'simple/'
    const parser = new NpmParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    // no de=dupping, so all packages will be in there
    const found = await parser.packages(
        NpmParser.tags.manifest, NpmParser.tags.lock,
        NpmParser.filePatterns.manifest, NpmParser.filePatterns.lock
    )
    expect(found.length).toEqual(5)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
