import * as fs from 'fs';
import {JsonContent} from '../../../src/app/classes'
import { IComposerLock, IComposerManifest } from '../../../src/parsers/composer/interfaces';
const sample_dir: string = './__samples__/app/php/'

//--- Test parsing of the json files
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
        const manifest:IComposerManifest = JsonContent.as<IComposerManifest>(fileContent)
        expect(manifest.name).toContain('test')
    })
})

//--- LOCKS
// all valid composer files to test
const validComposerLocks = [
    'valid/laminas/composer.lock'

]

validComposerLocks.forEach(composerLock => {
    test(`+ "${composerLock}" parses correctly with more than 2 packages.`, async () => {
        const file = sample_dir + composerLock
        const fileContent = fs.readFileSync(file, 'utf8')
        const lock:IComposerLock = JsonContent.as<IComposerLock>(fileContent)
        expect(lock.packages.length).toBeGreaterThanOrEqual(2)
    })
})
