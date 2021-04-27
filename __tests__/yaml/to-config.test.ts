import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as glob from '@actions/glob'


const sample_dir: string = './__samples__/'

test('test', async () => {})

// test('test a valid sample yaml file converts to object', async () => {
//     const file = sample_dir + 'config/valid/simple.yml'
//     const obj: Config = await yaml_to_config(file)
//     const valid: boolean = obj.valid()
//     // should be of correct type
//     expect(obj.constructor.name).toBe(Config.name)
// })


// // loop over all invalid yaml files and ensure they generate a single
// // error for each one
// test('error: yaml files with errors within them', async () => {
//     const expression = sample_dir + 'config/invalid/**/*.yml'
//     const globber = await glob.create(expression, {followSymbolicLinks: false})
//     const files = await globber.glob()

//     // all of these files should fail
//     expect.assertions(files.length)
//     for (let f of files) {
//         try {
//             const obj: Config = await yaml_to_config(f)
//         } catch (e) {
//             expect(e.message).toEqual(error_messages.yaml_to_config)
//         }
//     }
// })
