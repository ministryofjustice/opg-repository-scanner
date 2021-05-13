import * as fs from 'fs';

import { GoModParser } from "../../../src/parsers/go-mod/GoModParser"

const sample_dir: string = './__samples__/app/go/'

test(`+ Test modules are found in a go.mod.`, async () => {
    const dir = sample_dir + 'valid/simple/'
    const gop = new GoModParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await gop.manifests(GoModParser.tags.manifest, GoModParser.filePatterns.manifest)

    expect(found.length).toEqual(3)

})


test(`+ Test modules are found in a go.sum.`, async () => {
    const dir = sample_dir + 'valid/simple/'
    const gop = new GoModParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await gop.locks(GoModParser.tags.lock, GoModParser.filePatterns.lock)

    expect(found.length).toBeGreaterThan(100)

})
