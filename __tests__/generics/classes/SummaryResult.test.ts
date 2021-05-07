import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import { Result } from "../../../src/generics/classes/Result"
import { ResultMeta } from '../../../src/generics/classes/ResultMeta'
import { ManifestType } from '../../../src/generics/enums'
import { SummaryResult } from '../../../src/generics'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'


test('positve: version conversion between result and summary matches', async () => {
    // make a large result object
    let res = new Result('test-result')
    res.occurances.push(
        ...[
            new ResultMeta('^0.1.1', './test.manifest', ManifestType.Manifest, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.0.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
        ]
    )

    let summary = new SummaryResult()
    summary.version_from_result(res)

    expect(summary.version).toEqual('^0.1.1 (+ 2 others)')

})


test('positve: unique sources found correctly', async () => {
    // make a large result object
    let res = new Result('test-result')
    res.occurances.push(
        ...[
            new ResultMeta('^0.1.1', './test.manifest', ManifestType.Manifest, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.0.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
        ]
    )

    const summary = new SummaryResult()
    const found = summary.sources(res)
    expect(found.get('./test.lock')).toEqual(3)
    expect(found.get('./test.manifest')).toEqual(1)
})

test('positve: occurances conversion between result and summary finds correct number of merged occurances', async () => {
    // make a large result object
    let res = new Result('test-result')
    res.occurances.push(
        ...[
            new ResultMeta('^0.1.1', './test.manifest', ManifestType.Manifest, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.0.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
        ]
    )

    const summary = new SummaryResult()
    summary.occurances_from_result( summary.sources(res) )

    expect(summary.occurances.length).toEqual(2)

})


test('positve: summary conversion succeeds', async () => {
    // make a large result object
    let res = new Result('test-result')
    res.occurances.push(
        ...[
            new ResultMeta('^0.1.1', './test.manifest', ManifestType.Manifest, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.0.1', './test.lock', ManifestType.Lock, '*'),
            new ResultMeta('0.1.1', './test.lock', ManifestType.Lock, '*'),
        ]
    )
    res.tags = ['test', 'Lock', 'Manifest']
    let summary = new SummaryResult()
    summary = summary.from_result(res)

    expect( summary.tags.includes('first-party') ).toBeTruthy()
    expect( summary.occurances.length ).toBe(2)

})
