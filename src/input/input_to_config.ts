import {TypedJSON} from 'typedjson'
import {Config} from '../config'

export function input_to_config(input: Map<string, any>): Config {
    const excluded = JSON.parse(input.get('source_exclude').get('value'))
    const manifest = JSON.parse(input.get('manifests').get('value'))
    const as = JSON.parse(input.get('artifact_as').get('value'))
    const follow: boolean = input.get('source_follow_symlinks').get('value') === 'true'

    const obj = {
        source: {
            directory: input.get('source_directory').get('value'),
            follow_symlinks: follow,
            exclude: excluded
        },
        artifact: {
            name: input.get('artifact_name').get('value'),
            as
        },
        manifests: manifest
    }
    const config = TypedJSON.parse(obj, Config) as Config
    return config
}
