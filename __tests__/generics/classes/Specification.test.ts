import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { SpecificationHandler } from "../../../src/generics/classes/SpecificationHandler"
import { Specification } from "../../../src/generics/classes/Specification"
import { Result } from "../../../src/generics/classes/Result"
import { Source } from '../../../src/config'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'

test('postive: test generic creation of specifiction with empty handlers', async () => {
    const name = 'test-spec'
    const spec = new Specification<SpecificationHandler, Result>(name, [] )
    expect(spec.name).toEqual(name)
})

test('postive: test instanceof handlers', async () => {
    const name = 'test-spec'
    const handler = new SpecificationHandler(new Source(), '**', '.require')
    const spec = new Specification<SpecificationHandler, Result>(
                        name,
                        [handler]
                    )
    const res = spec.handlers().pop()
    expect(spec.name).toEqual(name)
    expect(res).toBeInstanceOf(SpecificationHandler)
})
