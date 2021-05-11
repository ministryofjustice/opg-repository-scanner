import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../../src/app';

import {Composer} from '../../../../src/parsers/composer/Composer'

const sample_dir: string = './__samples__/app/php/valid/'



test(`+ Test the locks function`, async () => {
    const dir = sample_dir + 'doctrine-instantiator/'
    const comp = new Composer().set(
        'test-repo',
        dir,
        ["(vendor/*)"],
        false
    )
    const found = await comp.locks()

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
    const found = await comp.manifests()
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
    const found = await comp.packages()
    expect(found.length).toEqual(10)
    expect(found[0]).toBeInstanceOf(PackageInfo)

    console.log(found)

})
