import {TypedJSON} from 'typedjson'
import {Config} from '../config'

export function input_to_config(input: Map<string, any>): Config {
    /* eslint-disable no-console */

    const skel = {
        source: {
            directory: '',
            follow_symlinks: false,
            exclude: []
        },
        artifact: {
            name: '',
            as: []
        },
        manifests: []
    }

    console.log('source_directory')
    // source.directory
    if (input.has('source_directory') && input.get('source_directory').has('value')) {
        skel.source.directory = input.get('source_directory').get('value')
    } else {
        skel.source.directory = input.get('source_directory').get('default')
    }

    console.log('source_follow_symlinks')
    // source.follow_symlinks
    if (input.has('source_follow_symlinks') && input.get('source_follow_symlinks').has('value')) {
        skel.source.follow_symlinks = input.get('source_follow_symlinks').get('value') === 'true'
    } else {
        skel.source.follow_symlinks = input.get('source_follow_symlinks').get('default') === 'true'
    }

    console.log('source_exclude')
    // source.exclude
    if (input.has('source_exclude') && input.get('source_exclude').has('value')) {
        skel.source.exclude = JSON.parse(input.get('source_exclude').get('value'))
    } else {
        skel.source.exclude = JSON.parse(input.get('source_exclude').get('default'))
    }

    console.log('artifact_name')
    // artifect.name
    if (input.has('artifact_name') && input.get('artifact_name').has('value')) {
        skel.artifact.name = input.get('artifact_name').get('value')
    } else {
        skel.artifact.name = input.get('artifact_name').get('default')
    }

    console.log('artifact_as')
    // artifact.as
    if (input.has('artifact_as') && input.get('artifact_as').has('value')) {
        skel.artifact.as = JSON.parse(input.get('artifact_as').get('value'))
    } else {
        skel.artifact.as = JSON.parse(input.get('artifact_as').get('default'))
    }

    console.log('manifests')
    // manifests
    if (input.has('manifests') && input.get('manifests').has('value')) {
        skel.manifests = JSON.parse(input.get('manifests').get('value'))
    } else {
        skel.manifests = JSON.parse(input.get('manifests').get('default'))
    }

    console.log(skel)
    /* eslint-enable no-console */

    const config = TypedJSON.parse(skel, Config) as Config
    return config
}
