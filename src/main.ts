import * as core from '@actions/core'
import {Config} from './config'
import {yaml_to_config} from './yaml'
// import * as glob from '@actions/glob'

async function run(): Promise<void> {
    try {
        // -- Load configuration
        const configuration_file: string =
            core.getInput('configuration_file') ?? './configuration.yml'
        const configuration: Config = await yaml_to_config(configuration_file)

        core.debug('configuration file loaded: ' + configuration_file)

        // find all the manifest and lock files
        core.debug('configuration finding manifest and lock files')
        configuration.find_manifest_and_lock_files()

        console.debug(configuration)
        // const ms: string = core.getInput('milliseconds')
        // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
        // core.debug(new Date().toTimeString())
        // await wait(parseInt(ms, 10))
        // core.debug(new Date().toTimeString())
        // core.setOutput('time', new Date().toTimeString())
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
