import {errors} from './errors'
import {yaml_to_json_object} from './yaml_to_json_object'
import {Config} from '../config'

import {TypedJSON} from 'typedjson'

// convert yaml configuration file over to a config class
export async function yaml_to_config(filename: string, encoding = 'utf8'): Promise<Config> {
    const json = await yaml_to_json_object(filename, encoding)

    return new Promise<Config>((resolve, reject) => {
        const config_class = TypedJSON.parse(json, Config) as Config
        const valid = config_class.valid()
        if (valid) {
            resolve(config_class)
        } else {
            reject(errors.yaml_to_config())
        }
    })
}
