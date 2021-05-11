import * as fs from 'fs';
import { PackageInfo, ManifestTypes } from '../../../../src/app';

import { JsonContent } from '../../../../src/app/classes'
import { IComposerLock, IComposerManifest } from '../../../../src/parsers/php-composer/interfaces';
import { PackageList } from '../../../../src/parsers/php-composer/classes';


const sample_dir: string = './__samples__/app/php/'

//--- Test generating packages
//--- MANIFESTS

// all valid composer files to test
const validComposerManifests = [
    'valid/laminas/composer.json',
    'valid/doctrine-instantiator/sub-folder/composer.json'
]

validComposerManifests.forEach(composerFile => {
    test(`+ "${composerFile}" parses correctly with name attribute.`, async () => {
        const file = sample_dir + composerFile
        const fileContent = fs.readFileSync(file, 'utf8')
        const manifest = JsonContent.as<IComposerManifest>(fileContent)

        let found = PackageList.manifest(
            manifest,
            'test-repo',
            'source!',
            ManifestTypes.Manifest,
            ['tags']
        )
        expect(found.length).toBeGreaterThanOrEqual(1)
    })
})


//--- LOCKS

// all valid composer files to test
const validComposerLocks = [
    'valid/laminas/composer.lock',
    'valid/doctrine-instantiator/sub-folder/composer.lock'
]

validComposerLocks.forEach(composerLock => {
    test(`+ "${composerLock}" parses correctly with name attribute.`, async () => {
        const file = sample_dir + composerLock
        const fileContent = fs.readFileSync(file, 'utf8')
        const lock = JsonContent.as<IComposerLock>(fileContent)

        let found = PackageList.lock(
            lock,
            'test-repo',
            'source!',
            ManifestTypes.Lock,
            ['tags']
        )

        expect(found.length).toBeGreaterThanOrEqual(1)

    })
})



test(`+ parse lock file recursively`, async () => {
    const file = sample_dir + 'valid/doctrine-instantiator/sub-folder/composer.lock'
    const fileContent = fs.readFileSync(file, 'utf8')
    const lock = JsonContent.as<IComposerLock>(fileContent)

    let found = PackageList.lock(
        lock,
        'test-repo',
        'source!',
        ManifestTypes.Lock,
        ['tags'],
        true
    )

    expect(found.length).toEqual(9)
    expect(found[0]).toBeInstanceOf(PackageInfo)
})



test(`+ Test the get<t> matches correct T types`, async () => {

    const file = sample_dir + 'valid/doctrine-instantiator/sub-folder/composer.lock'
    const fileContent = fs.readFileSync(file, 'utf8')
    const lock = JsonContent.as<IComposerLock>(fileContent)

    let found = PackageList.get<IComposerLock>(
        lock,
        'test-repo',
        'source!',
        ManifestTypes.Lock,
        ['test'],
        true
    )

    expect(found.length).toEqual(9)
    expect(found[0]).toBeInstanceOf(PackageInfo)

})
