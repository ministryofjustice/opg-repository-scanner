import * as fs from 'fs';
import { Report } from '../../../src/app/classes';
import { ComposerParser as Composer, PipParser } from '../../../src/parsers'

const sample_dir: string = './__samples__/app/'

test(`+ Test all packages call.`, async () => {

    // test using just composer
    const report = new Report(
        'test-report',
        sample_dir + 'php/valid/laminas/',
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


test(`+ Test all packages call with mutliple parsers.`, async () => {
    // test using just composer
    const report = new Report(
        'test-report',
        sample_dir + 'pip-composer/',
        ["(vendor/*)"],
        false,
        [new Composer(), new PipParser()]
    )

    await report.allPackages()
    // check packages tally aligns
    expect(report.counters.manifest.files).toEqual(2)
    expect(report.counters.lock.files).toEqual(1)
    expect(report.counters.manifest.packages).toEqual(8)
    expect(report.packages.length).toEqual(17)
})
