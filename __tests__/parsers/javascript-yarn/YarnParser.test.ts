import * as fs from 'fs';
import {YarnParser} from '../../../src/parsers/javascript-yarn'

const sample_dir: string = './__samples__/app/yarn/valid/'


test(`+ Test the tags function`, async () => {
    const parse = new YarnParser()
    const tags = parse.tags()
    const locks = YarnParser.tags.lock
    const manifest = YarnParser.tags.manifest
    expect(tags.lock).toEqual(locks)
    expect(tags.manifest).toEqual(manifest)
})



test(`- Test the mannifest function returns nothing`, async () => {
    const dir = sample_dir + 'sample/'
    const parse = new YarnParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await parse.manifests(YarnParser.tags.manifest, YarnParser.filePatterns.manifest)

    expect(found.length).toEqual(0)

})


test(`+ Test the lock function returns correctly`, async () => {
    const dir = sample_dir + 'sample/'
    const parse = new YarnParser().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await parse.locks(YarnParser.tags.lock, YarnParser.filePatterns.lock)

    expect(found.length).toEqual(12)

    let foundQuote = []
    found.forEach(f => f.meta.forEach(m => {
        if (m.version.indexOf('"') >= 0) foundQuote.push(f)
    }))

    expect(foundQuote.length).toEqual(0)

})
