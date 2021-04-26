import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { ComposerLock } from '../../../src/parser/classes'
import { PackageFile, PackageFileTypes } from '../../../src/config'

const sample_dir: string = './__samples__/'

// little helper to return json
function loader(filename:string){
    const content = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'} )
    return JSON.parse(content)
}


test('test a working composer.lock file for laminas', async () => {
    const pkg: PackageFile = new PackageFile()
    pkg.file = sample_dir + 'app/php/laminas/composer.lock'
    pkg.selectors = ['.packages', '.packages-dev']
    const laminas_composer = loader(pkg.file)
    const parser = new ComposerLock(pkg, laminas_composer)
    await parser.parse()

    //expect(parser.results.length).toEqual(3)

})
