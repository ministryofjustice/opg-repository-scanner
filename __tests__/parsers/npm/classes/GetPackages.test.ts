import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../../src/app';

import { GetPackages} from '../../../../src/parsers/node-npm/classes';


const sample_dir: string = './__samples__/app/npm/valid/'

test(`+ Test the file function finds composer files correctly`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir + 'simple/',
        ["**/package.json"],
        ["(vendor/*)"],
        ManifestTypes.Manifest,
        false
    )

    const files = await get.files()
    expect(files.length).toEqual(1)
})



test(`+ Test the get<T> matches correct T types`, async () => {

    const dir = sample_dir + 'simple/'
    const get = new GetPackages(
        'test-repo',
        dir,
        ["**/package-lock.json"],
        ["(vendor/*)"],
        ManifestTypes.Lock,
        true
    )
    const found = await get.get(['test'], true)

    expect(found.length).toEqual(3)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
