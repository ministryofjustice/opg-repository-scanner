import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { SpecificationHandler } from "../../../src/generics/classes/SpecificationHandler"
import { Result } from "../../../src/generics/classes/Result"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

//test('test', async () => {})

test('negative: test empty specification should be invalid', async () => {
    const handler = new SpecificationHandler()
    expect(handler.valid()).toBeFalsy()
})

test('positve: test specification handler based on composer', async () => {
    // super simple function that returns a basic result
    const test = async function(): Promise<Result[]>{
        return new Promise<Result[]>( resolve => { resolve([new Result('test')] ) } )
    }
    const handler = new SpecificationHandler(
        new Filesystem(),
        "**/composer.json",
        '.require',
        test
    )
    expect(handler.valid()).toBeTruthy()

})

test('negative: test specification with invalid name should not be valid', async () => {
    const handler = new SpecificationHandler(new Filesystem(), '')
    expect(handler.valid()).toBeFalsy()
})


test('positve: test file look up', async () => {
    // super simple function that returns a basic result
    const test = async function(): Promise<Result[]>{
        return new Promise<Result[]>( resolve => { resolve([new Result('test')] ) } )
    }
    const handler = new SpecificationHandler(
        new Filesystem(sample_dir),
        "app/php/laminas/composer.json",
        '.require',
        test
    )

    const files = await handler.files()
    expect(files.length).toEqual(1)

})