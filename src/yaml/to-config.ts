import {errors} from './errors'
import {yaml_to_json_object} from './to-json-object'
import {config} from '../config/classes'

// convert yaml configuration file over to a config class
export async function yaml_to_config(filename: string, encoding = 'utf8'): Promise<config> {
    const json = await yaml_to_json_object(filename, encoding)

    return new Promise<config>((resolve, reject) => {
        const config_class = new config(json)
        const valid = config_class.valid()
        if (valid) {
            resolve(config_class)
        } else {
            reject(errors.yaml_to_config())
        }
    })
}
