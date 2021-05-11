import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../../src/app';

import { JsonContent } from '../../../../src/app/classes'
import { IComposerLock, IComposerManifest } from '../../../../src/parsers/php-composer/interfaces';
import { GetPackages} from '../../../../src/parsers/php-composer/classes';


const sample_dir: string = './__samples__/app/php/valid/'



test(`+ Test the file function finds composer files correctly`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir + 'laminas/',
        ["**/composer.json"],
        ["(vendor/*)"],
        ManifestTypes.Manifest,
        false
    )

    const files = await get.files()
    expect(files.length).toEqual(1)
})



test(`+ Test the get<T> matches correct T types`, async () => {

    const dir = sample_dir + 'doctrine-instantiator/'
    const get = new GetPackages(
        'test-repo',
        dir,
        ["**/composer.lock"],
        ["(vendor/*)"],
        ManifestTypes.Lock,
        true
    )
    const found = await get.get(['test'], true)

    expect(found.length).toEqual(9)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
