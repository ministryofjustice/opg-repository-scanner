import * as core from '@actions/core'
import * as artifact from '@actions/artifact'

async function run(): Promise<void> {
    try {
    } catch (error) {
        core.error(error.message)
        core.setFailed(error.message)
    }
}

run()
