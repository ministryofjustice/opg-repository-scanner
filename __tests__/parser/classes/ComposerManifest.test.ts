import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { ComposerManifest } from '../../../src/parser/classes'
import { PackageFile, PackageFileTypes } from '../../../src/config'

const sample_dir: string = './__samples__/'

// little helper to return json
function loader(filename:string){
    const content = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'} )
    return JSON.parse(content)
}

test('test jq composer sanitise_selector', async () => {
    let jk = new ComposerManifest()
    let test_selectors = new Map([
        ['require',  '."require"'],
        [".require-dev",  '."require-dev"']
    ])

    for(let [original, expected] of test_selectors.entries() ) {
        let res:string = jk.sanitise_selector(original)
        expect(res).toEqual(expected)
    }

})


test('test a working composer.json file for laminas', async () => {
    const pkg: PackageFile = new PackageFile()
    pkg.file = sample_dir + 'app/php/laminas/composer.json'
    pkg.selectors = ['.require']
    const laminas_composer = loader(pkg.file)
    const parser = new ComposerManifest(pkg, laminas_composer)
    await parser.parse()

    expect(parser.results.length).toEqual(3)

})



test('test a working composer json file for laminas with dev dependancies too', async () => {
    const pkg: PackageFile = new PackageFile()
    pkg.file = sample_dir + 'app/php/laminas/composer.json'
    pkg.selectors = ['.require', '.require-dev']
    const laminas_composer = loader(pkg.file)
    const parser = new ComposerManifest(pkg, laminas_composer)
    await parser.parse()

    expect(parser.results.length).toEqual(17)

})
