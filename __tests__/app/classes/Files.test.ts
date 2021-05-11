import * as fs from 'fs';
import { Files } from '../../../src/app/classes';


const sample_dir: string = './__samples__/app/php/valid/laminas/'

test(`+ Test simple exclusions of file patterns.`, async () => {
    const files:string[] = [
        "test/sample.xml",
        "test/vendor/sample.xml"
    ]
    const exclusions:string[] = ["(vendor/*)"]
    const _files = new Files()

    let found = _files.filter(files, exclusions)
    expect(found.length).toEqual(1)
    let first = found.shift()
    expect(first).toEqual("test/sample.xml")

} )


test(`+ Test get ignores correct patterns.`, async () => {
    const dir = sample_dir
    const patterns:string[] = [ "**/composer.json"]
    const exclusions:string[] = ["(vendor/*)"]
    const _files = new Files()
    const found = await _files.get(dir, patterns, exclusions, false)

    expect(found.length).toEqual(1)
})
