import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../../src/app';
import { GetPackages } from '../../../../src/parsers/python-pip/classes';
import { PipParser as Pip } from '../../../../src/parsers/python-pip';
import { IContent } from '../../../../src/app/interfaces';
import { JsonContent } from '../../../../src/app/classes';


const sample_dir: string = './__samples__/app/pip/valid/'

test(`+ Test the file function finds composer files correctly`, async () => {

    const get = new GetPackages(
        'test-repo',
        sample_dir ,
        Pip.filePatterns.manifest,
        ["(vendor/*)"],
        ManifestTypes.Manifest,
        false
    )

    const files = await get.files()
    expect(files.length).toEqual(1)
})

test(`+ Test the get<T> matches correct T types`, async () => {

    const getter = new GetPackages(
        'test-repo',
        sample_dir,
        Pip.filePatterns.manifest,
        ["(vendor/*)"],
        ManifestTypes.Manifest,
        true
    )
    const found = await getter.get<IContent>(['test'], true, new JsonContent())

    expect(found.length).toEqual(7)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
