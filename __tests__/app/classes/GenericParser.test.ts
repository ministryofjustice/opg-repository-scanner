import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../src/app';
import {GenericParser} from '../../../src/app/classes/GenericParser'

const sample_dir: string = './__samples__/app'



test(`+ Test the tags function`, async () => {
    const gp = new GenericParser()
    const tags = gp.tags()
    const locks = GenericParser.tags.lock
    const manifest = GenericParser.tags.manifest
    expect(tags.lock).toEqual(locks)
    expect(tags.manifest).toEqual(manifest)
})



test(`+ Test the generic parser set lines up.`, async () => {
    const dir = sample_dir
    const gp = new GenericParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )

    expect(gp.directory).toEqual(sample_dir)

})
