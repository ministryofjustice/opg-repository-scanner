import * as core from '@actions/core'
import * as artifact from '@actions/artifact'
import {Config} from './config'
import {yaml_to_config} from './yaml'
import {ManifestResults} from './manifestresults'

async function run(): Promise<void> {
    try {
        // -- Load configuration
        const configuration_file: string = './configuration.yml'
        core.debug('configuration_file_used: ' + configuration_file)

        const configuration: Config = await yaml_to_config(configuration_file)
        core.debug('configuration file loaded')

        const handler: ManifestResults = new ManifestResults(configuration)
        core.debug('handler generated with configuration')

        core.debug('handler .process() starting')
        await handler.process()
        const files = await handler.save()

        core.debug(JSON.stringify(files))

        // generate artefact
        const artifact_name = configuration.artifact?.name ?? ''
        const artifact_client = artifact.create()

        if(files.length > 0 && artifact_name.length > 0) {
            core.debug('Generating artefact: ' + artifact)
            const response = await artifact_client.uploadArtifact(artifact_name, files, __dirname , {
                continueOnError: false
            })

        }

    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
