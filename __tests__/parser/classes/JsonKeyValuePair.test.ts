import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import {JsonKeyValuePair} from '../../../src/parser/classes'
import { PackageFile, PackageFileTypes } from '../../../src/config'

const sample_dir: string = './__samples__/'

function loader(filename:string){
    const content = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'} )
    return JSON.parse(content)
}


// test('test a working composer json file for laminas', async () => {
//     const pkg: PackageFile = new PackageFile()
//     pkg.file = sample_dir + 'app/php/laminas/composer.json'
//     pkg.selectors = ['.require']
//     const laminas_composer = loader(pkg.file)
//     const parser = new JsonKeyValuePair(pkg, PackageFileTypes.manifest,  laminas_composer)
//     await parser.parse()

//     expect(parser.results.length).toEqual(3)

// })


test('test a working composer json file for laminas with dev dependancies too', async () => {
    const pkg: PackageFile = new PackageFile()
    pkg.file = sample_dir + 'app/php/laminas/composer.json'
    pkg.selectors = ['.require', '.require-dev']
    const laminas_composer = loader(pkg.file)
    const parser = new JsonKeyValuePair(pkg, PackageFileTypes.manifest,  laminas_composer)
    await parser.parse()
    console.log(parser.results)
    expect(parser.results.length).toEqual(16)

})
