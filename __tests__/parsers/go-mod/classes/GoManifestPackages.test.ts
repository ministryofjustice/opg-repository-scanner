import * as fs from 'fs';

import { GoManifestPackages } from "../../../../src/parsers/go-mod/classes/GoManifestPackages"
import { PackageType } from "../../../../src/app/enums"

const sample_dir: string = './__samples__/app/go/valid/'


test(`+ Test modules are found in a go.mod.`, async () => {
    const modFile = fs.readFileSync(sample_dir + 'simple/go.mod', 'utf8')
    const packages = GoManifestPackages.get(
        modFile,
        'test-report',
        'source',
        []
    )

    expect(packages.length).toEqual(3)
    const gov = packages.find(i => i.name === 'go')

    expect(gov?.meta.pop()?.version).toEqual('1.16')

})


test(`+ Test modules are found in a go.mod with tag saying its a third party.`, async () => {
    const modFile = fs.readFileSync(sample_dir + 'tidy/go.mod', 'utf8')
    const packages = GoManifestPackages.get(
        modFile,
        'test-report',
        'source',
        []
    )

    expect(packages.length).toEqual(8)
    const gox = packages.find(i => i.name.indexOf('x/sys') >= 0 )
    const meta = gox?.meta.pop()

    expect(meta?.tags.includes(PackageType.ThirdParty) ).toBeTruthy()


})
