import * as core from '@actions/core'
import {TypedJSON} from 'typedjson'
import {Config} from '../config'

// an ugly looking function to parse the parts of the Map
export function input_to_config(input: Map<string, any>): Config {
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

    // source.directory
    core.debug('Parsing input: source_directory')
    if (input.has('source_directory') && input.get('source_directory').has('value')) {
        skel.source.directory = input.get('source_directory').get('value')
    } else {
        skel.source.directory = input.get('source_directory').get('default')
    }

    // source.follow_symlinks
    core.debug('Parsing input: source_follow_symlinks')
    if (input.has('source_follow_symlinks') && input.get('source_follow_symlinks').has('value')) {
        skel.source.follow_symlinks = input.get('source_follow_symlinks').get('value') === 'true'
    } else {
        skel.source.follow_symlinks = input.get('source_follow_symlinks').get('default') === 'true'
    }

    // source.exclude
    core.debug('Parsing input: source_exclude')
    if (input.has('source_exclude') && input.get('source_exclude').has('value')) {
        skel.source.exclude = JSON.parse(input.get('source_exclude').get('value'))
    } else {
        skel.source.exclude = JSON.parse(input.get('source_exclude').get('default'))
    }

    // artifect.name
    core.debug('Parsing input: artifact_name')
    if (input.has('artifact_name') && input.get('artifact_name').has('value')) {
        skel.artifact.name = input.get('artifact_name').get('value')
    } else {
        skel.artifact.name = input.get('artifact_name').get('default')
    }

    // artifact.as
    core.debug('Parsing input: artifact_as')
    if (input.has('artifact_as') && input.get('artifact_as').has('value')) {
        skel.artifact.as = JSON.parse(input.get('artifact_as').get('value'))
    } else {
        skel.artifact.as = JSON.parse(input.get('artifact_as').get('default'))
    }

    // manifests
    core.debug('Parsing input: manifests')
    if (input.has('manifests') && input.get('manifests').has('value')) {
        skel.manifests = JSON.parse(input.get('manifests').get('value'))
    } else {
        skel.manifests = JSON.parse(input.get('manifests').get('default'))
    }

    core.debug('Converting to Config class')
    const config = TypedJSON.parse(skel, Config) as Config
    return config
}
