import * as core from '@actions/core'
import * as artifact from '@actions/artifact'
import {Config} from './config'
import {yaml_to_config} from './yaml'
import {ManifestResults} from './manifestresults'
import {mapped_inputs} from './input/action_yaml'
import {input_to_config} from './input/input_to_config'

async function run(): Promise<void> {
    try {
        // config object
        let configuration: Config

        // map the input
        const inputs = mapped_inputs()

        core.info('Action inputs loaded:')
        /* eslint-disable no-console */
        console.log(inputs)
        /* eslint-enable no-console */

        const config_file = inputs.get('configuration_file')
        //-- Load configuration from a file or from inputs
        if (config_file.has('value')) {
            core.info('Configuration from file.')
            configuration = await yaml_to_config(config_file.get('value'))
        } else {
            core.info('Configuration from environment.')
            configuration = input_to_config(inputs)
        }

        core.info('Parsed configuration:')
        core.info(JSON.stringify(configuration))

        if (configuration.valid()) {
            const handler: ManifestResults = new ManifestResults(configuration)
            await handler.process()
            const files = await handler.save()

            // generate artefact
            const artifact_name = configuration.artifact?.name ?? ''
            const artifact_client = artifact.create()

            if (files.length > 0 && artifact_name.length > 0) {
                core.debug('Generating artefact: ' + artifact)
                // running directory is ./dist, but reports are saved to root of repo
                const dir = __dirname + '/../'
                const response = await artifact_client.uploadArtifact(artifact_name, files, dir, {
                    continueOnError: false
                })
            }
        } else {
            core.error('ERROR: Invalid configuration')
            core.setFailed('Invalid configuration')
        }
    } catch (error) {
        core.error(error.message)
        core.setFailed(error.message)
    }
}

run()
