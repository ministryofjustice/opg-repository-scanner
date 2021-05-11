import * as fs from 'fs';
import { Report } from '../../../src/app/classes';
import { Composer } from '../../../src/parsers'

const sample_dir: string = './__samples__/app/php/valid/laminas/'

test(`+ Test all packages call.`, async () => {

    // test using just composer
    const report = new Report(
        'test-report',
        sample_dir,
        ["(vendor/*)"],
        false,
        [new Composer()]
    )

    await report.allPackages()

    expect(report.counters.manifest.files).toEqual(1)
    expect(report.counters.lock.files).toEqual(1)

    // there is no de-dupping, so this will be the combination of .packages & packages-dev for composer
    expect(report.counters.manifest.packages).toEqual(17)

})
