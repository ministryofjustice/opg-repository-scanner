import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import 'reflect-metadata';
import { TypedJSON } from 'typedjson';

import { Config, Filesystem} from '../../../src/config'
import { ManifestResults } from "../../../src/manifestresults"
import { Packages, Specification } from '../../../src/generics';
import { ComposerSpecificationHandler } from '../../../src/composer';

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

test('postive: test instance creation from configuration', async () => {
    const configObj = {
        source: {
            directory: sample_dir,
            follow_symlinks: true
        },
        manifests: [{
            name: 'composer',
            uses: 'ComposerParser'
        }]
    }

    const config = TypedJSON.parse(configObj, Config) as Config
    const res = new ManifestResults(config)
    const instance = res.instance( config.manifests[0] )

    expect(res).toBeInstanceOf(ManifestResults)
    expect(instance).toBeInstanceOf(Packages)
    expect(instance.manifest).toBeInstanceOf(Specification)
    expect(instance.lock).toBeInstanceOf(Specification)
    expect(instance.manifest.handlers()[0]).toBeInstanceOf(ComposerSpecificationHandler)

})

test('postive: test finding a composer set of packages correctly', async () => {
    const configObj = {
        source: {
            directory: sample_dir + 'app/php/doctrine-instantiator',
            follow_symlinks: false
        },
        manifests: [{
            name: 'composer',
            uses: 'ComposerParser'
        }],

    }

    const config = TypedJSON.parse(configObj, Config) as Config
    const results = new ManifestResults(config)
    await results.process()

    //results.save()

    //expect(results.output.hasOwnProperty('package') ).toBeTruthy()
    //const packages = results.output['packages'] as []
    //expect(packages.length).toEqual(9)


})
