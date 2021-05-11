import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../src/app';
import {Pip} from '../../../src/parsers/pip/Pip'

const sample_dir: string = './__samples__/app/pip/valid/'



test(`+ Test the tags function`, async () => {
    const comp = new Pip()
    const tags = comp.tags()
    const locks = Pip.tags.lock
    const manifest = Pip.tags.manifest
    expect(tags.lock).toEqual(locks)
    expect(tags.manifest).toEqual(manifest)
})



test(`- Test the locks function returns nothing`, async () => {
    const dir = sample_dir
    const comp = new Pip().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.locks(Pip.tags.lock, Pip.filePatterns.lock)

    expect(found.length).toEqual(0)

})


test(`- Test the manifest function returns correctly`, async () => {
    const dir = sample_dir
    const comp = new Pip().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.manifests(Pip.tags.manifest, Pip.filePatterns.manifest)

    expect(found.length).toEqual(7)

})
