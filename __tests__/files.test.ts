import * as glob from '@actions/glob'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// base all file scanning on this diretory
const sample_dir: string = './__samples__/'
// Test that an exclusion of entire directory should blank out
// the main lookup
test('empty strings return zero results', async () => {
    var patterns: string[] = [sample_dir + '**', '!**']
    const globber = await glob.create(patterns.join('\n'), {
        followSymbolicLinks: false
    })
    var counter: number = 0
    for await (const file of globber.globGenerator()) {
        counter++
    }
    expect(counter).toBe(0)
})

// test that we do find some yaml files with a recursive pattern
test('find yml files recursively', async () => {
    var patterns: string[] = [sample_dir + '**/*.yml']
    const globber = await glob.create(patterns.join('\n'), {
        followSymbolicLinks: false
    })
    var counter: number = 0
    for await (const file of globber.globGenerator()) {
        counter++
    }
    expect(counter).toBeGreaterThan(0)
})
