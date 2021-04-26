import yaml from 'js-yaml'
import * as fs from 'fs'

// convert a yaml file over to a json object for processing
export async function yaml_to_json_object(filename: string, encoding = 'utf8'): Promise<Object> {
    return new Promise<Object>(resolve => {
        const options: object = {encoding, flag: 'r'}
        const content = fs.readFileSync(filename, options).toString()
        const json = yaml.load(content) as Object

        resolve(json)
    })
}
