import * as fs from 'fs';
import {PackageInfo} from '../../../src/app/classes/PackageInfo'
import { ManifestTypes } from '../../../src/app/enums';

const sample_dir: string = './__samples__/app'



test(`+ Test the expansion function`, async () => {

    const pi1 = new PackageInfo(
        'test-repo',
        'pkg1',
        '^0.0.1',
        ManifestTypes.Manifest,
        'test-m',
        ['m']
    )
    const pi2 = new PackageInfo(
        'test-repo',
        'pkg1',
        '0.0.2',
        ManifestTypes.Lock,
        'test-l',
        ['m']
    )

    pi1.expand(pi2)

    expect(pi1.meta.length).toEqual(2)
    expect(pi1.meta.filter(i => i.version === '0.0.2')?.length ).toEqual(1)
})
