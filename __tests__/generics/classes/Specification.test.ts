import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { SpecificationHandler } from "../../../src/generics/classes/SpecificationHandler"
import { Specification } from "../../../src/generics/classes/Specification"
import { Result } from "../../../src/generics/classes/Result"
import { Filesystem } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

test('postive: test generic creation of specifiction with empty handlers', async () => {
    const name = 'test-spec'
    const spec = new Specification<SpecificationHandler, Result>(name, [] )
    expect(spec.name).toEqual(name)
})

test('postive: test instanceof handlers', async () => {
    const name = 'test-spec'
    const handler = new SpecificationHandler(new Filesystem(), '**', '.require')
    const spec = new Specification<SpecificationHandler, Result>(
                        name,
                        [handler]
                    )
    const res = spec.handlers().pop()
    expect(spec.name).toEqual(name)
    expect(res).toBeInstanceOf(SpecificationHandler)
})


test('postive: test parsing results fixed results correctly', async () => {
    const name = 'test-spec'
    // test function that always returns same result
    const test = function(): Result[]{
        return [new Result('test')]
    }
    // base handler to load a file
    const handler = new SpecificationHandler(
        new Filesystem(sample_dir),
        "app/php/laminas/composer.json",
        '.require',
        test
    )
    const spec = new Specification<SpecificationHandler, Result>(
                        name,
                        [handler]
                    )
    await spec.parse()
    expect(spec.results().length).toEqual(1)

})
