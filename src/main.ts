import * as core from '@actions/core'
import * as artifact from '@actions/artifact'
import {ActionParameters, IParser} from './app'
import {Report} from './app/classes'
import {Output} from './app/classes/Output'
import {NpmParser, PipParser, ComposerParser} from './parsers'
import {IOutput} from './app/interfaces'
import {Raw} from './outputs/raw'

async function run(): Promise<void> {
    // this PARSERS object is where parsers need to push into
    const PARSERS: IParser[] = [new PipParser(), new NpmParser(), new ComposerParser()]
    const OUTPUTS: IOutput[] = [new Raw()]
    try {
        core.info('Starting action.')
        const parameters = ActionParameters.fromCoreInput()

        core.info('Action inputs loaded.')
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
        const files = await out.from(report)
    } catch (error) {
        core.error(error.message)
        core.setFailed(error.message)
    }
}

run()
