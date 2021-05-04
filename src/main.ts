import * as core from '@actions/core'
import {Config} from './config'
import {yaml_to_config} from './yaml'
import {ManifestResults} from './manifestresults'
// import * as glob from '@actions/glob'

async function run(): Promise<void> {
    try {
        // -- Load configuration
        const configuration_file: string =
            core.getInput('configuration_file') ?? './configuration.yml'

        const configuration: Config = await yaml_to_config(configuration_file)

        core.debug('configuration file loaded: ' + configuration_file)

        const handler = new ManifestResults(configuration)
        await handler.process()
        await handler.save()
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
