import * as core from '@actions/core'
import * as artifact from '@actions/artifact'
import * as path from 'path';


import {ActionParameters, IParser, Report, Output, IOutput} from './app'
import {NpmParser, PipParser, ComposerParser, GoModParser, YarnParser} from './parsers'
import {Raw, GroupAndCount, Simple} from './outputs'

async function run(): Promise<void> {
    // this PARSERS object is where parsers need to push into
    const PARSERS: IParser[] = [
        new ComposerParser(),
        new GoModParser(),
        new NpmParser(),
        new PipParser(),
        new YarnParser()
    ]
    // OUTPUTS contain all the output generators
    const OUTPUTS: IOutput[] = [new Simple(), new Raw(), new GroupAndCount()]

    try {
        core.info('Starting action.')
        const parameters = ActionParameters.fromCoreInput()

        core.info('Action inputs loaded.')
        core.info(`Action path: ${parameters.artifact_directory}`)
        core.info(`Source path: ${parameters.source_directory}`)
        /* eslint-disable no-console */
        if (core.isDebug()) console.log(parameters)
        /* eslint-enable no-console */
        const report = new Report(
            parameters.repository_name,
            parameters.source_directory,
            parameters.source_exclude,
            parameters.source_follow_symlinks,
            PARSERS
        )

        core.info('Report constructed.')
        /* eslint-disable no-console */
        if (core.isDebug()) console.log(report)
        /* eslint-enable no-console */

        await report.generate()
        core.info('Report generated.')
        /* eslint-disable no-console */
        if (core.isDebug()) console.log(report)
        /* eslint-enable no-console */

        const out = new Output(OUTPUTS)
        const artifactDir = path.resolve(parameters.artifact_directory, `${}__artifacts-${Date.now()}` ) + '/'
        const files = await out.from(report, artifactDir)
        core.info(`Created [${files.length}] report files.`)

        core.info(`Uploading artifact.`)
        const artifact_name = parameters.artifact_name
        const artifact_client = artifact.create()
        const response = await artifact_client.uploadArtifact(artifact_name, files, artifactDir, {
            continueOnError: false
        })
    } catch (error) {
        core.error(error.message)
        core.setFailed(error.message)
    }
}

run()
