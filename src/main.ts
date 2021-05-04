import * as core from '@actions/core'
import {Config} from './config'
import {yaml_to_config} from './yaml'
import {ManifestResults} from './manifestresults'
// import * as glob from '@actions/glob'

async function run(): Promise<void> {
    try {
        // -- Load configuration
        const configuration_file: string = './configuration.yml'
        core.setOutput('configuration_file_used', configuration_file)

        const configuration: Config = await yaml_to_config(configuration_file)
        core.setOutput('configuration_file_loaded', true)

        //core.debug('configuration file loaded: ' + configuration_file)

        const handler = new ManifestResults(configuration)
        core.setOutput('handler_loaded', true)

        // await handler.process()
        // await handler.save()
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
