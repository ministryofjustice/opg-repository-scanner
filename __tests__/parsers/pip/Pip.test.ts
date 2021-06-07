import * as fs from 'fs';
import {PipParser as Pip} from '../../../src/parsers'

const sample_dir: string = './__samples__/app/pip/valid/'
const versioned_sample_dir: string = './__samples__/app/pip/valid-versioned/'

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



test(`+ Test versions are returned correctly`, async () => {
    const dir = versioned_sample_dir
    const comp = new Pip().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.manifests(Pip.tags.manifest, Pip.filePatterns.manifest)

    let notVersioned = 0
    found.forEach(f => {
        f.meta.forEach(m => { if(m.version.length <= 0){ notVersioned += 1} } )
    })

    expect(notVersioned).toEqual(1)
})
