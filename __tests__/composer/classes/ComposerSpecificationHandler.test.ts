import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { ComposerSpecificationHandler } from "../../../src/composer/classes"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('postive: the composer selector is sanitised correctly with simple layout', async () => {
    const handler = new ComposerSpecificationHandler(
        new Filesystem(),
        "**/composer.json",
        ".require-dev"
    )
    expect(handler.valid()).toBeTruthy()
    expect(handler.selector).toEqual('."require-dev"')

})

test('postive: the composer selector is sanitised correctly with more complex form', async () => {
    const handler = new ComposerSpecificationHandler(
        new Filesystem(),
        "**/composer.json",
        ".require-dev.test.level-1"
    )
    expect(handler.valid()).toBeTruthy()
    expect(handler.selector).toEqual('."require-dev"."test"."level-1"')

})
