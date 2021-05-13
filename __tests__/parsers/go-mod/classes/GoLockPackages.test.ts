import * as fs from 'fs';

import { GoLockPackages } from "../../../../src/parsers/go-mod/classes/GoLockPackages"


const sample_dir: string = './__samples__/app/go/valid/simple/'

test(`+ Test modules are found in a go.sum.`, async () => {
    const modFile = fs.readFileSync(sample_dir + 'go.sum', 'utf8')
    const packages = GoLockPackages.get(
        modFile,
        'test-report',
        'source',
        []
    )

    expect(packages.length).toBeGreaterThan(100)
    const testify = packages.filter(i => i.name.indexOf('testify') >= 0 )

    expect(testify.length).toEqual(4)

})
